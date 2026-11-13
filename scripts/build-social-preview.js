// Keep the game HTML identical to the homepage, with server-readable route metadata.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const title = 'ShonenSpin | Anime Ascent — Daily Anime Quiz';
const description = 'Think you know anime? Test your knowledge in Anime Ascent, the anime version of Krillion! Climb the ranks, challenge other fans, and see how high you can go.';
const url = 'https://www.shonenspin.com/AnimeAscent';
let page = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
page = page.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
for (const key of ['description', 'og:description', 'twitter:description']) {
  page = page.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), `$1${description}`);
}
for (const key of ['og:title', 'twitter:title']) {
  page = page.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), `$1${title}`);
}
page = page.replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
page = page.replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
fs.writeFileSync(path.join(root, 'AnimeAscent.html'), page);
console.log('Generated AnimeAscent.html with Anime Ascent social metadata.');
