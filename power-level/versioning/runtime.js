(function(root) {
'use strict';
function create(payload, core, run) {
  if (!payload || !payload.bankVersion || ![5,7].includes(payload.questionIds?.length) || payload.questions.length !== payload.questionIds.length || new Set(payload.questionIds).size !== payload.questionIds.length || payload.questions.some((q,i) => q.id !== payload.questionIds[i])) throw Error('Invalid challenge payload');
  const questions = new Map(payload.questions.map(q => [q.id,q]));
  function score(answers) {
    if (!Array.isArray(answers) || answers.length !== payload.questionIds.length) throw Error('Invalid run');
    return answers.reduce((sum,name,i) => {
      if (name === null) return sum;
      const answer = payload.questions[i].answers.find(a => a.name === name);
      if (typeof name !== 'string' || !answer) throw Error('Invalid canonical answer');
      return sum + core.points(answer);
    },0);
  }
  return {
    score,
    match(id,value) { const q=questions.get(id); if(!q) throw Error('Unknown question'); return core.validate(q,value); },
    save(state) { return JSON.stringify({bankVersion:payload.bankVersion,date:payload.date,questionIds:payload.questionIds,state}); },
    restore(raw) {
      try { const saved=JSON.parse(raw);
        if(saved.bankVersion!==payload.bankVersion || saved.date!==payload.date || JSON.stringify(saved.questionIds)!==JSON.stringify(payload.questionIds)) return null;
        return run.restore(JSON.stringify(saved.state),payload.questions,payload.date,payload.questionIds);
      } catch { return null; }
    },
    // Results can request bounded slices when their disclosure rules permit it.
    answers(id,offset=0,limit=50) {
      if (!questions.has(id) || !Number.isInteger(offset) || offset<0 || !Number.isInteger(limit) || limit<1 || limit>100) throw Error('Invalid answer page');
      return questions.get(id).answers.slice(offset,offset+limit);
    }
  };
}
const api={create};if(typeof module!=='undefined')module.exports=api;else root.AscentVersionedRuntime=api;
})(globalThis);
