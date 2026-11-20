'use strict';
const token=location.hash.slice(1)||sessionStorage.getItem('ascent-review-token')||'';
if(token)sessionStorage.setItem('ascent-review-token',token);
history.replaceState(null,'',location.pathname);
const $=id=>document.getElementById(id);let data,limit=30,prepared,operationId;const selected=new Set();
const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
async function api(route,body){const r=await fetch('/api/'+route,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});const result=await r.json();if(!r.ok)throw Error(result.error);return result;}
const message=s=>$('message').textContent=s;
async function guarded(fn){try{await fn();}catch(e){message(e.message);}}
function render(){
 $('records').replaceChildren();const filtered=data.records.filter(r=>(!$('question').value||r.questionId===$('question').value)&&(!$('queue').value||r.assessment.queue===$('queue').value)&&r.character.toLowerCase().includes($('search').value.toLowerCase()));
 for(const r of filtered.slice(0,limit)){
  const card=node('article'),label=node('label'),check=node('input');check.type='checkbox';check.checked=selected.has(r.id);check.addEventListener('change',()=>check.checked?selected.add(r.id):selected.delete(r.id));label.append(check,document.createTextNode(r.character+' · '+r.assessment.queue+' · '+r.status));card.append(label,node('h2',r.question));
  card.append(node('p',`${r.claim.characterId} · ${r.claim.traitId}: ${r.claim.value} · ${r.anime||'Adaptation unknown'} (${r.claim.context.animeId||'unbound'})`),node('p',`${r.claim.context.scope} / ${r.claim.context.persistence} / ${r.claim.context.form||'No form specified'}`),node('p',r.alreadyAccepted?'Existing accepted answer: '+(r.acceptedNames||[]).join(', '):'Potential new answer; confirm identity'),node('p','Eligibility: '+r.eligibility+' · '+r.assessment.reasons.join('; ')));
  const list=node('ul');for(const e of r.evidence){const li=node('li'),a=node('a',e.kind+' source');a.href=e.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a,document.createTextNode(' — '+e.fact+' ['+e.supports+'; '+e.extraction+'; '+e.originFamily+']'));list.append(li);}card.append(list);
  const detail=node('details'),title=node('summary','Aliases, provenance and decision history');detail.append(title,node('pre',JSON.stringify({aliases:r.aliases,evidence:r.evidence,history:r.history},null,2)));card.append(detail);$('records').append(card);
 }
 $('more').hidden=filtered.length<=limit;$('summary').textContent=`${data.summary.total} candidates · ${data.summary.highEvidence} batch-ready · ${data.summary.uncertain} uncertain · ${data.summary.conflicting} conflicting · ${data.summary.approved} approved. Showing ${Math.min(filtered.length,limit)} of ${filtered.length}.`;
}
async function reload(){data=await api('review');selected.clear();$('question').replaceChildren(new Option('All questions',''));for(const [id,text]of new Map(data.records.map(r=>[r.questionId,r.question])))$('question').add(new Option(text,id));$('reviewer').replaceChildren(new Option('Select your identity',''));data.reviewers.forEach(r=>$('reviewer').add(new Option(r,r)));$('prepare').disabled=!data.reviewers.length;message(data.reviewers.length?'Ready.':'Read-only: configure your actual identities in private maintainers.json before making decisions.');render();}
$('reload').onclick=()=>guarded(reload);for(const id of ['question','queue','search'])$(id).addEventListener('input',()=>{limit=30;render();});$('more').onclick=()=>{limit+=30;render();};
$('prepare').onclick=()=>guarded(async()=>{prepared=await api('prepare',{ids:[...selected],reviewer:$('reviewer').value,status:$('status').value,eligibility:$('eligibility').value,note:$('note').value,reopen:$('reopen').checked,stateHash:data.stateHash});operationId=crypto.randomUUID();$('changes').textContent=JSON.stringify(prepared.changes,null,2);$('confirmed').checked=false;$('confirmation').showModal();});
$('cancel').onclick=()=>$('confirmation').close();$('commit').onclick=()=>guarded(async()=>{if(!$('confirmed').checked)throw Error('Confirm your review first.');$('commit').disabled=true;try{await api('commit',{planId:prepared.id,operationId,confirmed:true});$('confirmation').close();await reload();message('Decisions saved locally. Nothing published.');}finally{$('commit').disabled=false;}});
$('export').onclick=()=>guarded(async()=>{const result=await api('export'),blob=new Blob([JSON.stringify(result,null,2)],{type:'application/json'}),href=URL.createObjectURL(blob),a=node('a');a.href=href;a.download='anime-ascent-private-review.json';a.click();URL.revokeObjectURL(href);message('Private offline export downloaded. Keep it out of public hosting.');});
guarded(reload);
