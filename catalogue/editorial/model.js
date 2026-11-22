'use strict';
// Offline editorial assessments are recommendations, never trait approvals.
const M = require('../traits/model');
const E = require('../enrichment/eligibility');
const { accepted } = require('../enrichment/report');
const core = require('../../power-level/core');
const hash = value => require('node:crypto').createHash('sha256').update(JSON.stringify(value)).digest('hex');
const kinds = ['primary', 'licensed', 'secondary', 'dataset'];
function quality(row) {
  if (row.identity.status === 'conflict' || row.evidence.some(e => e.supports === 'contradicts')) return 'conflicting';
  const trait = row.evidence.filter(e => e.supports === 'trait' && e.animeId === row.animeId && row.animeId);
  if (trait.some(e => ['primary', 'licensed'].includes(e.kind)) && row.identity.status === 'corroborated') return 'direct';
  if (row.evidence.some(e => e.supports === 'trait' && e.kind === 'secondary')) return 'secondary';
  if (row.evidence.every(e => e.kind === 'dataset')) return 'unreferenced';
  return 'insufficient';
}
function validate(rows, store, definitions, catalogue, policy, questions) {
  M.validate(store, definitions, catalogue);
  const ids = new Set();
  for (const r of rows) {
    if (!r.id || ids.has(r.id)) throw Error('Duplicate editorial ID');
    ids.add(r.id);
    const a = store.associations.find(a => a.id === r.claimId);
    if (!a || M.latest(a).claim.characterId !== r.characterId) throw Error('Character identity conflict');
    const c = M.latest(a).claim, rule = policy.questions.find(q => q.questionId === r.questionId);
    if (!rule || !questions.some(q => q.id === r.questionId) || !E.matches(rule,c)) throw Error('Invalid question-specific trait');
    if (r.animeId && !catalogue.appearances.some(a => a.characterId === r.characterId && a.animeId === r.animeId)) throw Error('Unknown adaptation');
    if (!['corroborated','catalogue_only','conflict'].includes(r.identity?.status) || !r.identity.note?.trim()) throw Error('Missing identity review');
    if (!['recommend_include','needs_context','recommend_exclude'].includes(r.eligibility?.status) || !r.eligibility.note?.trim()) throw Error('Missing eligibility review');
    if (!['original_five','priority_38','category'].includes(r.batch) || !r.note?.trim() || !Array.isArray(r.evidence) || !r.evidence.length) throw Error('Invalid assessment');
    for (const e of r.evidence) {
      if (!kinds.includes(e.kind) || !['trait','identity','contradicts'].includes(e.supports) || !e.fact?.trim() || !e.locator?.trim() || !Number.isFinite(Date.parse(e.accessedAt))) throw Error('Invalid evidence');
      if (!/^https?:$/.test(new URL(e.url).protocol)) throw Error('Invalid evidence URL');
      if (e.animeId !== null && !catalogue.anime.some(a => a.id === e.animeId)) throw Error('Unknown evidence adaptation');
    }
  }
  return rows;
}
function preview(rows, store, catalogue, aliases, policy, questions) {
  const representatives = new Map();
  const weight = r => (M.latest(store.associations.find(a=>a.id===r.claimId)).status === 'rejected' ? -1 : quality(r) === 'direct' && r.eligibility.status === 'recommend_include' ? 2 : 1);
  for (const r of rows) {const key=`${r.questionId}/${r.characterId}`, prior=representatives.get(key);if(!prior || weight(r)>weight(prior)) representatives.set(key,r);}
  const candidates = rows.map(r => {
    const c = catalogue.characters.find(c => c.id === r.characterId);
    const q = questions.find(q => q.id === r.questionId);
    const match = accepted(q,c,aliases);
    const key = `${r.questionId}/${r.characterId}`, duplicate = representatives.get(key) !== r;
    const state = M.latest(store.associations.find(a=>a.id===r.claimId));
    const collisions = aliases.filter(a => a.characterId === c.id && a.collidesWith.length);
    const evidenceQuality = quality(r);
    const classification = state.status === 'rejected' ? 'rejected_claim' : duplicate ? 'duplicate' : evidenceQuality === 'conflicting' ? 'conflicting' : match.alreadyAccepted ? 'existing_answer_or_alias' : r.eligibility.status === 'recommend_exclude' ? 'invalid_for_question' : evidenceQuality === 'direct' && r.eligibility.status === 'recommend_include' ? 'new_evidence_supported' : 'insufficient_evidence_or_context';
    return {...r, character:c.name, status:M.latest(store.associations.find(a=>a.id===r.claimId)).status, evidenceQuality, classification, ...match, aliases:aliases.filter(a=>a.characterId===c.id), warnings:[...(duplicate?['Repeated character/question; counted once']:[]),...(collisions.length?['Ambiguous aliases withheld; do not merge character IDs']:[]),...(!r.animeId?['Adaptation unresolved']:[]),r.eligibility.note]};
  });
  return {offlineOnly:true, liveAnswerChanges:0, questions:policy.questions.map(rule => {
    const q=questions.find(q=>q.id===rule.questionId), entries=candidates.filter(c=>c.questionId===q.id);
    return {questionId:q.id,title:q.text,currentAcceptedCount:q.answers.length,entries,estimatedIncreaseIfApproved:entries.filter(c=>c.classification==='new_evidence_supported').length,approvedIncrease:0, pending:entries.filter(c=>c.status!=='verified').length};
  })};
}
function decisionTemplate(row,store) {
  const a=store.associations.find(a=>a.id===row.claimId), state=M.latest(a);
  return {instructions:'Copy action into a separate decision file; fill all null fields after an actual authorized review. Evidence must be incorporated into the claim; a recommendation is not an approval. Question eligibility is a separate decision.', recommendation:row.eligibility, evidence:row.evidence, action:{operationId:null,claimId:a.id,expectedRevision:state.revision,reviewer:null,status:null,note:null,claim:structuredClone(state.claim)}};
}
// Explicit local maintainer operation; never called by package generation.
function applyDecision(store, action, definitions, catalogue) {
  if (!action.reviewer?.trim() || /^(import:|codex|assistant|replace|your name)/i.test(action.reviewer) || !action.note?.trim() || !['verified','rejected','needs_review'].includes(action.status)) throw Error('Explicit maintainer decision required');
  return M.review(store,action,definitions,catalogue);
}
function aliasReport(rows,catalogue,aliases,questions) {
  const ids=new Set(rows.map(r=>r.characterId));
  return aliases.filter(a=>ids.has(a.characterId)).map(a=>({ ...a, recommendation:a.collidesWith.length?'hold_collision':a.kind==='reversed_name_order'?'review_name_order':'needs_independent_identity_source', affectedQuestions:rows.filter(r=>r.characterId===a.characterId).map(r=>({questionId:r.questionId,currentlyAccepted:core.validate(questions.find(q=>q.id===r.questionId),a.name).status==='valid'})), applied:false })).sort((a,b)=>Number(b.collidesWith.length>0)-Number(a.collidesWith.length>0)||a.characterId.localeCompare(b.characterId)||a.name.localeCompare(b.name));
}
module.exports={quality,validate,preview,decisionTemplate,applyDecision,aliasReport,hash};
