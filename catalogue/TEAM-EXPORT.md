# Complete local archive and compact team export

This supplements the existing importer and TEAM-SETUP workflow. It does not
upload, grant source rights, initialize another repository or publish answers.
The live website never reads these files. Use Python 3.12+ (`python` on Windows,
`python3` on macOS). `ASCENT_PYTHON` overrides the offline knowledge adapter's
Python executable when necessary.

## Scope and rights gate

The full archive preserves every SQLite table, observation, identity binding,
version and imported legacy state. Catalogue, metadata, association and review
JSON files are included separately when present. Compact JSONL contains all
identities and current positive/held observations; it is **not** a complete
history. Source snapshots, external research attachments and review documents
outside these files remain in their original private locations. This is not a
backup of the entire research directory.

ACDB's official dump offers ODbL/DbCL data, requiring applicable notices and
license compliance. Page/profile prose and third-party content are not assumed
covered by that dump's grant. The existing mixed store contains supplied-page
material, raw profiles and private research/review state. Its transfer scope is
unresolved: do not upload the complete export even to a private repo until its
contents and team authorization have been reviewed. Wikidata structured data is
CC0; that does not clear accompanying ACDB crosswalks, other source material or
private reviews. Tenrai/MAL catalogue and cast metadata also retain upstream
rights restrictions: permitted application processing is not blanket raw-data
redistribution permission. Review the team-transfer scope and notices separately
([Tenrai terms](https://tenrai.org/terms)). A source-trusted fact is not an approved
game answer.

References: [ACDB dumps](https://www.animecharactersdatabase.com/databasedumps.php),
[ODbL](https://opendatacommons.org/licenses/odbl/1-0/),
[Wikidata licensing](https://www.wikidata.org/wiki/Wikidata:Licensing).

## Local preparation (no transfer)

First take a consistent SQLite backup, compress it and record its uncompressed/
compressed SHA-256 plus the table counts in the existing receipt format. Retain
the uncompressed snapshot (or decompress the archived snapshot locally). Place
the matching catalogue/metadata/review JSON alongside that private snapshot. Do not copy a live WAL database as a single
file. The export command checks both archive and uncompressed snapshot hashes plus
table-count agreement, and refuses a nonempty WAL. It requires the exact
uncompressed archive snapshot, not a separately changing live database.

```sh
python3 -B catalogue/team-export.py export PRIVATE/snapshot/knowledge.sqlite PRIVATE/new-export PRIVATE/backup.sqlite.gz PRIVATE/backup.receipt.json
python3 -B catalogue/team-export.py verify PRIVATE/new-export TRUSTED_MANIFEST_SHA256
python3 -B catalogue/team-export.py restore PRIVATE/new-export TRUSTED_MANIFEST_SHA256 PRIVATE/new-restored-directory
```

The trusted manifest digest must arrive through an authenticated team channel;
a manifest supplied alongside untrusted data alone is not an authenticity check.
Restore verifies every file, the decompressed archive SHA-256, SQLite integrity
and table counts. It refuses overwriting an existing directory. Preserve failed
restore directories for diagnosis; retry to a new path. Restore never contacts
production. Protect the export directory as private data, including its manifest.

## Private GitHub handoff — after rights/owner clearance

No private data repository has been created by this correction. Choose the actual
owner and collaborator access first; do not invent a clone URL. After the owner
creates the authorized **private** repository, install Git LFS, clone its actual
URL, and use the following within that separate data checkout:

```sh
git lfs install
git lfs track 'archive.sqlite.gz'
```

Copy only the specifically authorized export, license/attribution notices and
manifest. Commit `.gitattributes` there before the archive. Normal Git rejects
files larger than 100 MiB; our complete compressed archive is about 759 MB, so
it requires LFS (or authorized private release/object storage), not normal Git.
Check the owner's current LFS storage/bandwidth limits before upload. The archive
fits the documented 2 GB Free/Pro per-file LFS limit, but usage still consumes
quota. Do not upload under a "complete" label if any restricted content is omitted;
make a new explicitly scoped export with a new manifest instead.

[GitHub file limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github),
[Git LFS limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage).

Your co-developer then clones that actual private URL, runs `git lfs pull`, obtains
the trusted manifest digest, verifies and restores using the commands above in
the game checkout. Configure locally (PowerShell: `$env:NAME = 'value'`):

```sh
export ASCENT_CATALOGUE_DATA_DIR=/absolute/private/new-restored-directory
export ASCENT_TRAIT_REVIEW_STATE="$ASCENT_CATALOGUE_DATA_DIR/state.json"
export ASCENT_KNOWLEDGE_DATABASE="$ASCENT_CATALOGUE_DATA_DIR/knowledge.sqlite"
npm run catalogue:validate
npm run catalogue:knowledge -- validate
npm run catalogue:knowledge -- metrics
npm run catalogue:knowledge -- profile --character mal-character-40
```

Use existing KNOWLEDGE.md search specifications to query traits and generate
private candidate banks. Proposals retain their existing approval/rights gates.
Do not approve claims merely to bootstrap a developer checkout.

## Updates and reproducibility

Stop imports, take a new consistent backup/receipt, export to a new directory,
verify and review the manifest before committing authorized updates. Stable
character-ID hash buckets (64 per kind) and deterministic gzip headers keep compact
changes localized. Dataset version hashes file checksums, not timestamps. The
full history archive remains the authoritative reconstruction; do not reconstruct
history from only the compact current projection. An archival checkpoint need
not accompany every compact update, but label each snapshot's version honestly.
Never overwrite history or replace a collaborator's working SQLite implicitly.
