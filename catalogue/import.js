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
function client({ fetcher = fetch, wait = sleep, failures = () => {}, intervalMs = 650 } = {}) {
  if (!Number.isFinite(intervalMs) || intervalMs < 500) throw Error('Minimum request interval is 500ms');
  return async endpoint => {
    for (let attempt = 0; attempt < 5; attempt++) {
      await wait(intervalMs);
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
  if(config.checkpointEvery !== undefined && (!Number.isSafeInteger(config.checkpointEvery) || config.checkpointEvery < 1)) throw Error('Invalid checkpoint interval');
  if (config.passId !== undefined && (typeof config.passId !== 'string' || !/^[a-zA-Z0-9-]+$/.test(config.passId))) throw Error('Invalid passId');
  if (config.targetCharacters !== undefined && (!Number.isSafeInteger(config.targetCharacters) || config.targetCharacters < 1)) throw Error('Invalid target');
  const characters = new Map(data.characters.map(c => [c.malId,c]));
  const animeIndex = new Set(data.anime.map(a => a.id));
  const appearances = new Set(data.appearances.map(a => a.animeId + '/' + a.characterId));
  if(config.passId) data.importPasses ||= [];
  for (const id of new Set(config.animeIds)) {
    if (config.targetCharacters && data.characters.length >= config.targetCharacters) break;
    const pass = config.passId && config.passId + ':' + id;
    if (pass ? data.importPasses.includes(pass) : data.completedAnime.includes(id)) continue;
    try {
    const animeData = (await request(`/anime/${id}`)).data;
    if (animeData?.mal_id !== id) throw Error('Anime ID mismatch');
    const anime = identity(animeData, 'anime');
    if (!animeIndex.has(anime.id)) { data.anime.push(anime); animeIndex.add(anime.id); }
    const cast = (await collection(request, `/anime/${id}/characters`)).slice(0, limit);
    if (!cast.length) { const issue=`anime ${id}: empty cast; retry required`; if(!data.review.includes(issue))data.review.push(issue); checkpoint(data); continue; }
    for (const entry of cast) {
      const characterId = entry.character?.mal_id;
      if (!Number.isSafeInteger(characterId) || characterId < 1) {
        const issue = `anime ${id}: invalid character ID`;
        if (!data.review.includes(issue)) data.review.push(issue);
        checkpoint(data); continue;
      }
      let character = characters.get(characterId);
      if (!character) {
        const detail = config.characterDetails === false ? entry.character : (await request(`/characters/${characterId}`)).data;
        try {
          if (detail?.mal_id !== characterId) throw Error('Character ID mismatch');
          character = identity(detail, 'character');
          data.characters.push(character);
          characters.set(characterId,character);
        } catch (error) {
          const issue = `character ${characterId}: ${error.message}`;
          if (!data.review.includes(issue)) data.review.push(issue);
          checkpoint(data); continue;
        }
      }
      const appearanceKey = anime.id + '/' + character.id;
      if (!appearances.has(appearanceKey)) {
        appearances.add(appearanceKey);
        data.appearances.push({ animeId: anime.id, characterId: character.id,
          role: ['Main', 'Supporting'].includes(entry.role) ? entry.role : null,
          provider: 'Tenrai', sourceUrl: `${BASE}/anime/${id}/characters`, importedAt: new Date().toISOString() });
      }
      checkpoint(data);
    }
    if (!data.completedAnime.includes(id)) data.completedAnime.push(id);
    if(pass) data.importPasses.push(pass);
    checkpoint(data);
    console.log(`Completed ${anime.name}: ${data.characters.length} unique characters`);
    } catch(error) {
      const issue = `anime ${id}: import failed: ${error.message}`;
      if(!data.review.includes(issue)) data.review.push(issue);
      checkpoint(data);
      if(!config.continueOnError) throw error;
    }
  }
  return data;
}
function report(data) {
  const groups=new Map(data.anime.map(a=>[a.id,[]])),characters=new Map(data.characters.map(c=>[c.id,c]));
  for(const a of data.appearances)groups.get(a.animeId).push(a.characterId);
  return { animeProcessed:data.completedAnime.length, uniqueCharacters:data.characters.length,
    aliases:data.characters.reduce((n,c)=>n+c.aliases.length,0),relationships:data.appearances.length,
    duplicateRecordsMerged:data.appearances.length-data.characters.length,apiFailures:data.apiFailures,
    manualReviewRecords:data.review.length, failedRecords:data.review,
    coverage:data.anime.map(a=>({anime:a.name,characters:groups.get(a.id).length})),
    examples:data.anime.map(a=>({anime:a.name,character:characters.get(groups.get(a.id)[0])?.name})) };
}
function acquireLock(lock,recover=false) {
  if(recover && fs.existsSync(lock)) {
    const owner=JSON.parse(fs.readFileSync(lock));
    if(owner.host!==require('node:os').hostname() || !Number.isSafeInteger(owner.pid) || owner.pid<1)throw Error('Cannot establish lock ownership');
    let alive=true;try{process.kill(owner.pid,0);}catch(error){if(error.code==='ESRCH')alive=false;else throw error;}
    if(alive)throw Error('Import owner is still running');
    fs.unlinkSync(lock);
  }
  const handle=fs.openSync(lock,'wx');
  fs.writeFileSync(handle,JSON.stringify({pid:process.pid,host:require('node:os').hostname()}));
  return handle;
}
async function main() {
  if(!process.argv[2])throw Error('Supply an explicit authorized import configuration; no automatic bulk import');
  const config = JSON.parse(fs.readFileSync(process.argv[2]));
  const directory = require('./team-data').directory(process.argv[3]);
  fs.mkdirSync(directory, { recursive: true });
  const lock = path.join(directory, '.import.lock');
  const handle = acquireLock(lock,process.argv.includes('--recover-lock'));
  const file = path.join(directory, 'catalogue.json');
  let data;
  const started=Date.now(); let requests=0; let initialCharacters=0;
  try {
    data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : empty();
    initialCharacters=data.characters.length;
    const metadataFile=path.join(directory,'anime-metadata.json');
    const metadata=fs.existsSync(metadataFile)?JSON.parse(fs.readFileSync(metadataFile)):{};
    const remote = client({ intervalMs:config.intervalMs ?? 650, failures: () => { data.apiFailures++; } });
    const request=async endpoint=>{
      requests++;
      const response=await remote(endpoint);
      if(/^\/anime\/\d+$/.test(endpoint) && response.data) {
        const a=response.data;
        if(a.mal_id!==Number(endpoint.split('/').at(-1))) throw Error('Anime ID mismatch');
        metadata[a.mal_id]=require('./metadata').extract(a);
        fs.writeFileSync(metadataFile+'.tmp',JSON.stringify(metadata,null,2)+'\n');fs.renameSync(metadataFile+'.tmp',metadataFile);
      }
      return response;
    };
    let checkpoints=0;
    await run(config, data, request, data => {if(++checkpoints % (config.checkpointEvery ?? 25) === 0) save(file,data);});
  } finally {
    try {
      if (data) { save(file, data); fs.writeFileSync(path.join(directory, 'report.json'), JSON.stringify({...report(data),lastSession:{seconds:(Date.now()-started)/1000,requests,initialCharacters,addedCharacters:data.characters.length-initialCharacters}}, null, 2) + '\n'); }
    } finally { fs.closeSync(handle); fs.unlinkSync(lock); }
  }
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { identity, aliases, client, collection, empty, run, report, acquireLock };
