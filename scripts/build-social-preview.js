// Keep each game route's HTML identical to the homepage, but with server-readable route metadata
// (title, description, canonical, share preview), so crawlers and link previews see the right page.
// Runs on every Vercel build (npm run build); the generated files are git-ignored.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function routePage(file, { title, description, url, keywords, imageAlt, ld }) {
  let page = home.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  for (const key of ['description', 'og:description', 'twitter:description']) {
    page = page.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), `$1${description}`);
  }
  for (const key of ['og:title', 'twitter:title']) {
    page = page.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), `$1${title}`);
  }
  page = page.replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
  page = page.replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  if (keywords) page = page.replace(/(<meta name="keywords" content=")[^"]*/, `$1${keywords}`);
  if (imageAlt) page = page.replace(/(<meta property="og:image:alt" content=")[^"]*/, `$1${imageAlt}`);
  if (ld) page = page.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(ld)}\n</script>`);
  fs.writeFileSync(path.join(root, file), page);
  console.log(`Generated ${file} (${url}).`);
}

// /AnimeAscent permanently redirects to /, but keep its file in case of older links.
routePage('AnimeAscent.html', {
  title: 'Anime Krillion — The Daily Anime Krillion Quiz | Shonen Spin',
  description: 'Anime Krillion: the daily anime quiz in the style of Krillion. Seven questions a day; name the rarest answer and climb to the summit.',
  url: 'https://www.shonenspin.com/AnimeAscent',
});

// /descent: the reverse mode, served from its own file so it is indexed and previewed as its own page.
const descentTitle = 'Reverse Anime Krillion — Anime Descent: Name the Most Common Answer | Shonen Spin';
const descentDescription = 'Reverse Anime Krillion (Anime Descent): seven anime questions a day where the MOST common answer wins. Read the crowd, say what everyone else would say, and descend to the valley.';
routePage('descent.html', {
  title: descentTitle,
  description: descentDescription,
  url: 'https://www.shonenspin.com/descent',
  keywords: 'reverse krillion, anime descent, reverse anime krillion, most common answer game, anime quiz, daily anime quiz, anime trivia, shonen spin',
  imageAlt: 'Anime Descent, the reverse daily anime quiz by Shonen Spin',
  ld: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Anime Descent',
    alternateName: ['Reverse Anime Krillion', 'Reverse Krillion Anime'],
    url: 'https://www.shonenspin.com/descent',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: descentDescription,
    isPartOf: { '@type': 'WebSite', '@id': 'https://www.shonenspin.com/#website', url: 'https://www.shonenspin.com/', name: 'Anime Krillion' },
  },
});
