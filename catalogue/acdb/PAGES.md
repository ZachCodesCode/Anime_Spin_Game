# Saved ACDB character pages → existing private knowledge store

This is an offline extension of `traits/importer/knowledge.js`, its prepared ledger,
SQLite writer, source-trust policy, search and existing question generator. It does
not call providers during gameplay or change a published answer bank. No new
character database, crawler or administrator interface is introduced.

## Configure the existing data

From the shared-data worktree:

```sh
cd /private/tmp/ascent-shared-database
export ASCENT_CATALOGUE_DATA_DIR='/Users/alexpham/Documents/Anime_Spin_Game/catalogue/private/trait-importer-pilot-2026-11-21'
export ASCENT_KNOWLEDGE_DATABASE="$ASCENT_CATALOGUE_DATA_DIR/knowledge.sqlite"
export ASCENT_TRAIT_REVIEW_STATE="$ASCENT_CATALOGUE_DATA_DIR/state.json"
```

The directory is the existing developer's configuration, not a dataset included in
Git. Other maintainers must bootstrap an actually authorized private knowledge
attachment and use their own absolute private path; see `../TEAM-SETUP.md`.
Back up and verify the current SQLite store before importing. Do not copy a live
WAL database file without the SQLite backup API. No schema migration is needed.

The following files must be actual saved/supplied permitted sources. Example paths
name inputs the operator supplies; the commands do not download missing files:

```sh
npm run catalogue:acdb-pages -- import --input "$ASCENT_CATALOGUE_DATA_DIR/saved-pages/12445.html" --output "$ASCENT_CATALOGUE_DATA_DIR/NEW-one-page-report.json"
npm run catalogue:acdb-pages -- import --input "$ASCENT_CATALOGUE_DATA_DIR/saved-pages" --output "$ASCENT_CATALOGUE_DATA_DIR/NEW-directory-report.json"
npm run catalogue:acdb-pages -- import --input "$ASCENT_CATALOGUE_DATA_DIR/pages-manifest.json" --output "$ASCENT_CATALOGUE_DATA_DIR/NEW-manifest-report.json"
# Replay without overwriting the original receipt; addedObservations must be zero.
npm run catalogue:acdb-pages -- import --input "$ASCENT_CATALOGUE_DATA_DIR/pages-manifest.json"
```

Directory mode reads nonrecursive `.html`/`.htm` files, up to 5,000 per batch.
Manifest mode also accepts bounded `.txt` inputs. Each file is limited to 10 MiB;
HTML resources/scripts are never executed, loaded or followed. Python 3's standard
HTMLParser handles the tree, entities, common omitted table/list closing tags and
known ACDB layouts without adding a runtime dependency. Input symlinks are refused.
Malformed pages are reported individually; conflicting captures for the same ID
are rejected as a batch rather than arbitrarily choosing one. Reports and prepared
rows must remain under configured private storage. Use new report filenames;
historical receipts are immutable. Import is transactional per 100-row batch and
resumes from the existing ledger after interruption.

## Page manifest

```json
{
  "format": "anime-ascent-acdb-pages-v1",
  "retrievedAt": "2026-11-22T12:00:00Z",
  "pages": [
    {
      "file": "saved-pages/12445.html",
      "characterId": "12445",
      "sourceUrl": "https://www.animecharactersdatabase.com/characters.php?id=12445",
      "name": "Usopp"
    },
    {
      "file": "supplied-profile.txt",
      "type": "text",
      "characterId": "12445",
      "sourceUrl": "https://www.animecharactersdatabase.com/characters.php?id=12445",
      "name": "Usopp",
      "appearances": [{"title":"One Piece","media":"anime","primary":true}]
    }
  ]
}
```

Do not include conflicting versions of the same character in one manifest: import
sequential captures separately to retain their versions. Identity is checked against
page ID/canonical URL/header and the manifest. A partial page needs explicit name
and ID if absent from its remaining HTML. Same-name different-franchise captures
cannot override an existing stable ACDB binding. Existing canonical IDs, provider
IDs and canonical aliases are preserved. A known binding may supply previously
established anime assignments for a partial page; this does not assert that the
partial HTML itself included them. New identities still require an explicit anime
assignment; title names alone do not imply anime rather than game/manga/VN media.

The text reader accepts explicit labelled fields (`Name:`, `Ages:`, `Height:`,
`Birthday:`, `Occupation:`, `Crew:`, etc.), a `Tags:` comma-separated block and a
`Profile`/`Biography` block. It stops at `Comments` or `Suggested Characters`.
Unstructured arbitrary text is not interpreted as a full page. Text input is
explicitly marked partial. Existing `anime-ascent-character-profiles-v1` structured
exports also work as `--input`; authorized feeds continue to use the existing
permission manifest via `--manifest` and source policy, not a separate adapter.

## What is extracted

- Only the character's own `Tags` table row, explicit character-tag container, or
  bounded Tags heading section. Global Tags menus, events, adverts, comments and
  recommendations do not supply traits. Original labels and numeric tag IDs when
  explicitly present are retained. A label-valued `tag=pirate` is not a numeric ID.
  Conflicting tag IDs or links naming another character fail closed.
- Identity table fields, explicit profile definition lists/tables, names/aliases,
  Japanese-name fields, primary assignment and explicit media type.
- Multiple ages remain separate values with unknown chronology; height requires a
  unit and birthday requires month/day. Profile occupations, positions, weapons,
  abilities, species and affiliations use the existing normalizer.
- Relations rows and ACDB relation lists preserve target character IDs and literal
  relationship labels. `Mother of X` means target X is the subject's child;
  `Younger Sister of X` supplies a sibling relationship without inventing X's gender.
  Ambiguous types or unresolved target identities remain held.
- Only narrow deterministic description templates produce trusted factual claims,
  including exact-subject `NAME is the sniper of the CREW.`. Negations, speculation,
  subjective claims and arbitrary prose are not converted into asserted powers.
  Uninterpreted biography material is retained as a hashed pending observation.
  Full biography text enters the stored profile only if the existing local
  `descriptionReuse` permission configuration supplies a real grant, reviewer/date
  and permission reference. See `../traits/importer/KNOWLEDGE.md`.

Basic SQL attributes are parsed when present but already-stored equivalent basic
facts are skipped. Missing or empty sections are never treated as authoritative
absence. Page imports are deliberately additive: new facets carry forward earlier
positive observations with original source-version references. A revised/partial
page cannot erase the prior 17 tags. Fact corrections/removals need explicit
contextual review rather than an inferred deletion from a saved page.

Unknown tags remain searchable as `source.tag` with their exact original label.
Known tags use existing definitions; explicit `sword user` maps to sword equipment,
not swordsman. Source trust remains `source_trusted` for direct ACDB assertions,
not independent verification, maintainer approval or publication permission.
Conflicts, unsupported fields and biography interpretations remain held. ACDB's
ODbL/DbCL provenance and publication holds are retained separately from Wikidata
CC0 statements. No existing review history or source evidence is overwritten.

## Inspect, search, generate and validate

```sh
npm run catalogue:acdb-pages -- inspect --character acdb-character-12445
npm run catalogue:acdb-pages -- search --tag sniper
npm run catalogue:acdb-pages -- search --tag pirate
npm run catalogue:acdb-pages -- search --tag ponytail
npm run catalogue:acdb-pages -- search --tag goggles
npm run catalogue:acdb-pages -- search --tag 'EXACT UNFAMILIAR LABEL'
npm run catalogue:acdb-pages -- generate --tag pirate --output "$ASCENT_CATALOGUE_DATA_DIR/NEW-pirates-draft.json"
npm run catalogue:acdb-pages -- coverage --input "$ASCENT_CATALOGUE_DATA_DIR/NEW-manifest-report.json"
npm run catalogue:knowledge -- validate
npm run catalogue:validate
npm run traits -- validate
npm test
npm run build
npm run ascent:integrity
```

Searches query the same ACDB/Wikidata store and return stable identity, anime
assignments, original source statement/tag, context and trust. Compound searches
continue through `catalogue:knowledge search --query ...`. Existing generator
aliases, proposed rarity, eligibility warnings and editorial Limit Break/release
gates are retained. A source-trusted draft is not an approved answer list.

## Optional authorized network acquisition — disabled without a real grant

ACDB's [terms](https://www.animecharactersdatabase.com/tos.php) prohibit scraping.
No character-page requests are needed for the local workflow. This task does not
supply permission to acquire pages from the site. Do not bypass login, CAPTCHA,
bot detection or the protected API. To use the optional adapter, the operator must
actually obtain documented ACDB permission for the exact pages, then configure a
private authorization file with `enabled:true`, actual `authorizedBy`, actual
`reviewedBy`/`reviewedAt`, `permissionReference`, future `expiresAt`, and `urls`.
No example reviewer/grant is supplied or automatically created. A string in a JSON
file is a configuration record, not proof that ACDB granted permission.

```sh
npm run catalogue:acdb-pages -- acquire --authorization "$ASCENT_CATALOGUE_DATA_DIR/ACTUAL-acdb-permission.json" --output "$ASCENT_CATALOGUE_DATA_DIR/NEW-authorized-pages"
```

The gate is checked before any request. It allows only explicit HTTPS ACDB character
URLs, at most 20 per invocation, with two-second spacing and an identifying client.
Redirects, HTTP failures and access challenges stop acquisition; no crawling,
ID enumeration, authentication bypass or automatic retry around a block is offered.
The private manifest and original permission receipt remain with the captured
pages. Request broader authorized exports through the existing ACDB access process
rather than treating this bounded optional adapter as a website-wide crawler.

The existing authorized knowledge bundle carries stored observations, versions and
legacy reviews. Raw HTML/cache transfer requires separately established permission
and private storage; never attach raw pages or the SQLite store to a public PR.

## Inputs demonstrated in this checkout

These actual local inputs exist in the developer's private workspace. They are not
bundled with a fresh clone or a production deployment:

```sh
npm run catalogue:acdb-pages -- import --input '/Users/alexpham/Documents/Anime_Spin_Game/catalogue/private/phase5c/pages'
npm run catalogue:acdb-pages -- import --input "$ASCENT_CATALOGUE_DATA_DIR/acdb-pages-2026-11-22/usopp-text-manifest.json"
npm run catalogue:acdb-pages -- import --input '/Users/alexpham/Documents/Anime_Spin_Game/catalogue/private/acdb-profile-expansion-2026-11-22/usopp-supplied.json'
```

The Usopp text input is the supplied 17-tag list, explicitly labelled as bounded
text. The structured input is the previously supplied profile. A complete saved
Usopp HTML page was **not** available, and was not fabricated or fetched. HTML
acceptance uses other existing saved ACDB pages plus public synthetic test markup.
Identity-held pages retain source-only observations, source IDs, labels, URLs and
page hashes in their source records; they cannot supply canonical answer candidates.
`inspect` exposes current source warnings as well as active traits. Existing
canonical provider IDs/aliases/appearances survive a new ACDB link. UI markers such
as `Unsorted` are not positive character-role facts. Stable canonical hashing avoids
repeated relationship observations caused solely by JSON object-key ordering.
