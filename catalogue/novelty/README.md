# Offline identity novelty audit

This module is for editorial planning only. It does not change gameplay normalization,
accepted answers, catalogue aliases, rarity, review histories or publication permissions.

Accepted answers currently lack stable character IDs. `resolve` can prefer an explicit
characterId when one is provided, but in the actual bank it derives a provisional ID
crosswalk from catalogue names/aliases and the candidate's documented anime appearances.
Do not describe this as an authoritative stable-ID crosswalk already present in the bank.

Matching order: explicit IDs; exact normalized token sets (including reversed name order
and documented alternative English aliases); limited ou/o, oo/o, uu/u romanization on
multi-token names. Only candidates with compatible catalogue anime appearances survive.
Exact matches in another franchise do not block a valid contextual romanization lookup.
Same-franchise collisions are ambiguous, not automatic identity merges. No edit-distance,
phonetic AI, nickname generation or unreferenced English-name translations are used.

Name token order normalization is an audit convenience, not proof of identity. It may
lose meaningful ordering. Vowel reduction is likewise a hypothesis. Inspect match basis,
all IDs and source context before accepting an alias correction. Missing crosswalks,
characters outside this 5,831-identity catalogue, and undocumented aliases can leave false
novelty. No zero-ambiguity count proves zero errors. Broad franchise/remake links must
never be invented from similar title strings.

`genuinely_new_answer_candidate` means no accepted answer resolved to this catalogue ID
within the question and known adaptation. It does NOT mean verified character trait,
approved eligibility, canonical novelty outside the available identities, or cleared
publication rights. `ineligible_for_question` requires an explicit supplied editorial
finding; the novelty engine never infers trait ineligibility from names.

`alias_only_improvement` is a subset of existing-answer duplicates, not an additional
new-answer count. Missing aliases are recommendations only. Multiple accepted answer
objects resolving to one candidate are flagged for investigation rather than merged.

Private Phase 5F audit inputs/output live under catalogue/private/phase5f. The audit
reads the original Phase 5D proposal preview to preserve the original 211 baseline;
Phase 5E and publication-readiness are used only for evidence annotations. The replay
command is `node catalogue/private/phase5f/audit.js`. Review state is never written.
No downloaded third-party records should be placed in this source directory.
