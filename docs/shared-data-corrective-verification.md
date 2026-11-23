# Shared catalogue corrective verification — November 23, 2026

The existing PR #28 branch incorporates main c8c68da without altering live gameplay,
question banks, scoring, leaderboards, Anime Descent or assignment activation.

## Reused work and corrected planner

Existing 34 drafts / 8,485 proposals, 21 selected slots, 14-day scheduler, importer,
SQLite knowledge store and review history were preserved. No questions were
regenerated, no source was reimported, and no claims were approved.

The existing planner keeps seven fresh concepts first. Otherwise it permits at
most one reviewed repeat plus six fresh concepts, after at least 14 Toronto date
intervals. IDs and normalized/reviewed concepts share the cooldown. Returning
questions rank by actual valid canonical answer count ascending, then optional
reliable performance evidence and existing fairness/stability tie-breaks. No fixed
answer-count cutoff, mandatory 50-run gate or <=50% success gate was introduced.
Coverage, wording, rights, comparability and stored-name anomaly safeguards remain.
Invalid scores, duplicate stable identities or ambiguous aliases cannot earn repeat
priority. Raw source candidates never count as accepted answers.

Focused tests demonstrate Nov15 → Nov28 blocked / Nov29 eligible, paraphrase
blocking, all-fresh preference, one-repeat maximum, char/char/title/char/char/title/
char, smaller-vs-larger approved answer pools without player statistics, and
invalid-bank rejection. No production runtime schedule has been changed.

## Actual private export

The original knowledge store remains in the owner's private research directory.
Its restored full archive and original source have identical logical contents in
**every table**, including historical observations, bindings, jobs and legacy state.
The original and independently restored-snapshot exports also have identical file
hashes and dataset version. Review state SHA-256 remains
`a0bf4804cf9b826e76626699226dfa98349e483bd075fdb07874fa3e6f45b6cf`.

- 60,673 SQLite identities; 60,671 searchable by positive traits.
- 350,313 distinct positive character/trait/value triples.
- 358,289 current positive observations / 358,254 contextual source claims.
- 2,302,978 historical observations; 317,048 historical source records.
- 66,412 bindings; 25 completed import versions; zero incomplete imports.
- 135 ACDB source tag assignments retained; no new tags imported in this correction.
- Existing catalogue: 5,831 characters, 100 anime, 5,950 appearances.
- Review validation: 60 definitions, 5,360 pending claims, zero verified claims.

Payload: 847,190,528 bytes plus manifest; archive 759,486,186 bytes; compact
192 hash-bucket gzip JSONL partitions 44,520,491 bytes; matching catalogue/metadata/
associations/review JSON sidecars included. The archive decompresses to
6,231,969,792 bytes and restores with a matching SHA-256 and SQLite integrity.
The compact projection includes current held observations but does not pretend to
replace the full historical archive. Other private research attachments stay in
their original locations, outside this database archive.

Dataset version:
`62c803af982be937dac29a52e179cb9e0c657c96d4599041082dbec45470473a`

Trusted manifest digest (owner's local verified-data-export):
`2acd650fcbfe2ada37dee8356777edded1382f6dd2a7451a8f48671c5395f91e`

Read-back profile mal-character-40 returned Luffy and 34 current positive facts;
existing pirate-trait search returned 436 characters. Search results are internal
source-backed candidates, not verified gameplay answers.

## Transfer and cross-platform status

No private GitHub data repository was created and no dataset uploaded. The mixed
archive retains raw profiles, private reviews and ACDB/Tenrai provenance; an actual
owner and source/transfer-rights assessment are required before a private upload.
ODbL/DbCL notices and possible derivative-database obligations remain attached;
Wikidata CC0 facts do not clear unrelated material. This is a complete local archive,
not a claim that every included record has authorized redistribution rights.

See catalogue/TEAM-EXPORT.md for Git LFS limits, exact verify/restore/setup commands,
Windows environment setup, rights boundaries and incremental update procedure.
The tool never uploads or grants rights, refuses public checkout destinations,
checks the immutable source/archive digests, and never overwrites a dataset.

280/280 full tests passed on macOS, plus build, release integrity, catalogue/metadata
and review/trait validations. Export tests verify deterministic partitions,
complete historical restoration, corruption detection and unsafe-path/overwrite
rejection. Python launcher selection now supports Windows or ASCENT_PYTHON.
LF checkout and three-OS CI matrix are added. Actual Windows/Linux runs remain
pending; no tests were skipped or hidden. Private data remains Git-ignored and
excluded from Vercel. Nothing was merged into main, deployed or written to Turso.
