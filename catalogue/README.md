# Shared offline character catalogue

Start with [TEAM-SETUP.md](TEAM-SETUP.md). The website continues to use its reviewed
question bank. None of these tools run in gameplay, make live AI calls, approve
answers automatically or update the production database.

Public files contain the existing code, schemas, 18 authored trait definitions,
question predicates, and explicitly fictional test fixtures. The real catalogue
and pending evidence are deliberately **not redistributed** in this public PR.
The existing local catalogue has 5,831 identities, 5,950 appearances and 100 anime;
its five initial claims remain pending. Additional research histories stay private.
Provider permissions are described in SOURCES.md; public redistribution remains
unresolved. Existing development-branch availability is not rights clearance.

Supported modules: `import.js` (explicit authorized configuration), `validate.js`,
`metadata.js`, `novelty/`, `traits/`, `verification/`, `enrichment/`, `editorial/`,
`expansion/`, `generator/` and `../power-level/scheduling/`. The ACDB importer is
excluded. Historic phase-specific commands require the corresponding authorized
private research package; they do not create or fabricate missing research.

No cron, daily synchronization, public admin interface or third-party gameplay
API dependency is introduced. Any updated data must pass review and validation;
accepted answers enter gameplay only through a separately reviewed bank release.
