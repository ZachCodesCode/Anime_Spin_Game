'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { validate } = require('./validate');
const BASE = 'https://api.tenrai.org/v1';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const text = value => typeof value === 'string' ? value.trim() : '';
const aliasKey = value => value.normalize('NFKC').toLocaleLowerCase('en').replace(/\s+/gu, ' ').trim();
function aliases(values, name) {
  const seen = new Set([aliasKey(name)]);
  return values.filter(value => typeof value === 'string').map(text).filter(value => {
    const key = aliasKey(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function identity(data, kind) {
  if (!data || !Number.isSafeInteger(data.mal_id) || data.mal_id < 1) throw Error('Invalid MAL ID');
  const name = text(kind === 'anime' ? data.title : data.name);
  if (!name) throw Error('Missing name');
  const sourceUrl = `https://myanimelist.net/${kind}/${data.mal_id}`;
  return { id: `mal-${kind}-${data.mal_id}`, malId: data.mal_id, name,
    aliases: aliases(kind === 'anime' ? [data.title_english, ...(data.title_synonyms || [])] : data.nicknames || [], name),
    japaneseName: text(kind === 'anime' ? data.title_japanese : data.name_kanji) || null,
    sourceUrl, provider: 'Tenrai', importedAt: new Date().toISOString() };
}
function client({ fetcher = fetch, wait = sleep, failures = () => {} } = {}) {
  return async endpoint => {
    for (let attempt = 0; attempt < 5; attempt++) {
      await wait(650);
      let response;
      try { response = await fetcher(BASE + endpoint, { signal: AbortSignal.timeout(30000) }); }
      catch (error) {
        failures();
        if (attempt === 4) throw error;
        await wait(1000 * 2 ** attempt);
        continue;
      }
      if (response.ok) return response.json();
      failures();
      if (response.status !== 429 && response.status < 500) throw Error(`HTTP ${response.status}: ${endpoint}`);
      if (attempt === 4) throw Error(`Retries exhausted: ${endpoint}`);
      const header = response.headers.get('retry-after');
      const retry = header && /^\d+(\.\d+)?$/.test(header) ? Number(header) * 1000 : Date.parse(header) - Date.now();
      await wait(Math.max(1000 * 2 ** attempt, Number.isFinite(retry) ? retry : 0));
    }
  };
}
// Supports the documented pagination envelope for future paginated collection endpoints.
async function collection(request, endpoint) {
  const result = [];
  for (let page = 1; page <= 20000; page++) {
    const response = await request(endpoint + (page === 1 ? '' : `${endpoint.includes('?') ? '&' : '?'}page=${page}`));
    if (!Array.isArray(response.data)) throw Error('Invalid collection response');
    result.push(...response.data);
    if (!response.pagination?.has_next_page) return result;
    if (response.pagination.current_page !== page || !response.data.length) throw Error('Invalid pagination');
  }
  throw Error('Pagination limit exceeded');
}
function empty() { return { version: 1, anime: [], characters: [], appearances: [], completedAnime: [], review: [], apiFailures: 0 }; }
function save(file, data) {
  validate(data);
  fs.writeFileSync(file + '.tmp', JSON.stringify(data, null, 2) + '\n');
  fs.renameSync(file + '.tmp', file);
}
async function run(config, data, request, checkpoint = () => {}) {
  if (!Array.isArray(config.animeIds) || !config.animeIds.length || config.animeIds.some(id => !Number.isSafeInteger(id) || id < 1)) throw Error('Invalid animeIds');
  const limit = config.maxCharactersPerAnime ?? Number.MAX_SAFE_INTEGER;
  if (!Number.isSafeInteger(limit) || limit < 1) throw Error('Invalid character limit');
  validate(data);
  for (const id of new Set(config.animeIds)) {
    if (data.completedAnime.includes(id)) continue;
    const animeData = (await request(`/anime/${id}`)).data;
    if (animeData?.mal_id !== id) throw Error('Anime ID mismatch');
    const anime = identity(animeData, 'anime');
    if (!data.anime.some(a => a.id === anime.id)) data.anime.push(anime);
    const cast = (await collection(request, `/anime/${id}/characters`)).slice(0, limit);
    for (const entry of cast) {
      const characterId = entry.character?.mal_id;
      if (!Number.isSafeInteger(characterId) || characterId < 1) {
        const issue = `anime ${id}: invalid character ID`;
        if (!data.review.includes(issue)) data.review.push(issue);
        checkpoint(data); continue;
      }
      let character = data.characters.find(c => c.malId === characterId);
      if (!character) {
        const detail = (await request(`/characters/${characterId}`)).data;
        try {
          if (detail?.mal_id !== characterId) throw Error('Character ID mismatch');
          character = identity(detail, 'character');
          data.characters.push(character);
        } catch (error) {
          const issue = `character ${characterId}: ${error.message}`;
          if (!data.review.includes(issue)) data.review.push(issue);
          checkpoint(data); continue;
        }
      }
      if (!data.appearances.some(a => a.animeId === anime.id && a.characterId === character.id)) {
        data.appearances.push({ animeId: anime.id, characterId: character.id,
          role: ['Main', 'Supporting'].includes(entry.role) ? entry.role : null,
          provider: 'Tenrai', sourceUrl: `${BASE}/anime/${id}/characters`, importedAt: new Date().toISOString() });
      }
      checkpoint(data);
    }
    data.completedAnime.push(id);
    checkpoint(data);
    console.log(`Completed ${anime.name}: ${data.characters.length} unique characters`);
  }
  return data;
}
function report(data) {
  return { animeProcessed: data.completedAnime.length, uniqueCharacters: data.characters.length,
    aliases: data.characters.reduce((n, c) => n + c.aliases.length, 0), relationships: data.appearances.length,
    duplicateRecordsMerged: data.appearances.length - data.characters.length, apiFailures: data.apiFailures,
    manualReviewRecords: data.review.length,
    coverage: data.anime.map(a => ({ anime: a.name, characters: data.appearances.filter(r => r.animeId === a.id).length })),
    examples: data.anime.map(a => ({ anime: a.name, character: data.characters.find(c => data.appearances.some(r => r.characterId === c.id && r.animeId === a.id))?.name })) };
}
async function main() {
  const config = JSON.parse(fs.readFileSync(process.argv[2] || path.join(__dirname, 'pilot.json')));
  const directory = path.resolve(process.argv[3] || path.join(__dirname, 'data'));
  fs.mkdirSync(directory, { recursive: true });
  const lock = path.join(directory, '.import.lock');
  const handle = fs.openSync(lock, 'wx');
  const file = path.join(directory, 'catalogue.json');
  let data;
  try {
    data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : empty();
    const request = client({ failures: () => { data.apiFailures++; } });
    await run(config, data, request, data => save(file, data));
  } finally {
    try {
      if (data) { save(file, data); fs.writeFileSync(path.join(directory, 'report.json'), JSON.stringify(report(data), null, 2) + '\n'); }
    } finally { fs.closeSync(handle); fs.unlinkSync(lock); }
  }
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { identity, aliases, client, collection, empty, run, report };
