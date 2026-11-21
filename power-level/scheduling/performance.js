'use strict';
const C=require('../core');
function wilson(successes,total,z=1.96){if(!total)return null;const p=successes/total,d=1+z*z/total,center=(p+z*z/(2*total))/d,margin=z*Math.sqrt(p*(1-p)/total+z*z/(4*total*total))/d;return {lower:Math.max(0,center-margin),upper:Math.min(1,center+margin)};}
// Only completed submitted runs are stored by ascent_scores. Never attribute a positional array from today's scheduler.
function analyze({rows=[],assignments=[],legacyOrders=[],loadRelease,questions=[],source={available:false}}){
 if(source.truncated)throw Error('Truncated export cannot support release difficulty ranking');
 const attributedAssignments=new Map();
 const stats=new Map(questions.map(q=>[q.id,{questionId:q.id,text:q.text,lastConfirmedUsage:null,lastReconstructedUsage:null,exposures:0,valid:0,nonValid:0,nullOutcomes:0,invalidStoredNames:0,tiers:{},bankVersions:[],versionDetails:{},status:'UNKNOWN'}])),unattributed=[],seen=new Map();
 const orders=new Map();for(const a of assignments){if(orders.has(a.date)&&JSON.stringify(orders.get(a.date))!==JSON.stringify(a))throw Error('Conflicting immutable attribution');orders.set(a.date,a);}
 const counts={inputRows:rows.length,attributedRows:0,unattributedRows:0,duplicateRows:0,conflictingRows:0};
 const identity=row=>row.guest?row.day+'\0'+row.guest:null;
 for(const row of rows){const key=identity(row);if(!key)continue;if(seen.has(key)&&JSON.stringify(seen.get(key))!==JSON.stringify(row))seen.set(key,null);else if(!seen.has(key))seen.set(key,row);}
 const processed=new Set();
 for(const row of rows){
  const key=identity(row);if(key&&processed.has(key)){counts.duplicateRows++;continue;}if(key)processed.add(key);
  const reject=reason=>{counts.unattributedRows++;unattributed.push({date:row.day,reason});};
  if(key&&seen.get(key)===null){counts.conflictingRows++;reject('Conflicting records for player/date');continue;}
  if(!key){reject('Missing player/date dedup identity');continue;}
  try{require('./fresh').daysBetween(row.day,row.day);}catch{reject('Invalid recorded date');continue;}
  if(row.mode&&row.mode!=='ascent'){reject('Not an Ascent completed run');continue;}
  let answers;try{answers=typeof row.answers==='string'?JSON.parse(row.answers):row.answers;}catch{reject('Malformed answers');continue;}
  if(!Array.isArray(answers)||![5,7].includes(answers.length)){reject('Not a full submitted run');continue;}
  const version=row.bankVersion||row.bank_version,rawIDs=row.questionIds||row.question_ids;
  let order=null;
  if(version){try{order={date:row.day,bankVersion:version,questionIds:typeof rawIDs==='string'?JSON.parse(rawIDs):rawIDs,confidence:'versioned_record'};}catch{}}
  else {const matches=legacyOrders.filter(x=>x.date===row.day&&['confirmed_deployment','reliable_reconstruction'].includes(x.confidence)&&x.evidence?.trim());if(matches.length===1)order=matches[0];}
  if(!order?.bankVersion||!Array.isArray(order.questionIds)||order.questionIds.length!==answers.length||new Set(order.questionIds).size!==answers.length){reject('Original bank/order not reliably established');continue;}
  const pin=orders.get(row.day);if(pin&&(pin.bankVersion!==order.bankVersion||JSON.stringify(pin.questionIds)!==JSON.stringify(order.questionIds))){reject('Recorded version/order conflicts with immutable pin');continue;}
  let release;try{release=loadRelease(order.bankVersion);}catch{reject('Missing or corrupt frozen release');continue;}
  const qs=order.questionIds.map(id=>release.bank.find(q=>q.id===id));if(qs.some(q=>!q||q.descent)){reject('Unknown question or wrong mode');continue;}
  counts.attributedRows++;attributedAssignments.set(JSON.stringify([row.day,order.bankVersion,order.questionIds]),{date:row.day,bankVersion:order.bankVersion,questionIds:order.questionIds,confidence:order.confidence});
  qs.forEach((q,i)=>{if(!stats.has(q.id))stats.set(q.id,{questionId:q.id,text:q.text,lastConfirmedUsage:null,lastReconstructedUsage:null,exposures:0,valid:0,nonValid:0,nullOutcomes:0,invalidStoredNames:0,tiers:{},bankVersions:[],versionDetails:{},status:'UNKNOWN'});const s=stats.get(q.id);if(!s.versionDetails[order.bankVersion])s.versionDetails[order.bankVersion]={text:q.text,contentHash:require('node:crypto').createHash('sha256').update(JSON.stringify({text:q.text,note:q.note,answers:q.answers})).digest('hex'),exposures:0,valid:0,nonValid:0};const variant=s.versionDetails[order.bankVersion];variant.exposures++;const value=answers[i],a=typeof value==='string'?q.answers.find(a=>a.name===value):null;s.exposures++;if(a){s.valid++;variant.valid++;const tier=(release.core||C).grade(a).name;s.tiers[tier]=(s.tiers[tier]||0)+1;}else{s.nonValid++;variant.nonValid++;if(value===null)s.nullOutcomes++;else s.invalidStoredNames++;}const field=order.confidence==='reliable_reconstruction'?'lastReconstructedUsage':'lastConfirmedUsage';if(!s[field]||row.day>s[field])s[field]=row.day;if(!s.bankVersions.includes(order.bankVersion))s.bankVersions.push(order.bankVersion);});
 }
 return {source,counts,attributedAssignments:[...attributedAssignments.values()],denominator:'completed submitted runs with reliably attributed original bank/order; not challenge opens',nullLimitation:'Null combines skips, timeouts and other unsuccessful outcomes; they cannot be separated in stored arrays.',unattributed,questions:[...stats.values()].map(s=>({...s,status:s.exposures?'OBSERVED_COMPLETED_RUNS':'UNKNOWN',successPercentage:s.exposures?100*s.valid/s.exposures:null,wilson95:wilson(s.valid,s.exposures),smoothedSuccess:s.exposures?(s.valid+1)/(s.exposures+2):null,sampleAdequate:s.exposures>=50,confidence:s.exposures?'Original frozen bank/order established; completed-run-only selection bias':'No safely attributable results'}))};
}
function repeatAssessment(performance,quality,{minSamples=50,maxUpper=.5}={}){
 if(!performance||performance.exposures<minSamples||!performance.wilson95)return {eligible:false,reason:'UNKNOWN or insufficient completed-run sample'};
 if(new Set(Object.values(performance.versionDetails||{}).map(v=>v.contentHash)).size>1&&quality?.versionsComparable!==true)return {eligible:false,reason:'Changed historical wording/answer lists require explicit comparability review'};
 if(performance.bankVersions?.some(v=>!quality?.reviewedBankVersions?.includes(v)))return {eligible:false,reason:'Historical answer-bank coverage/wording review required for each scored version'};
 if(performance.invalidStoredNames)return {eligible:false,reason:'Stored-name or attribution anomalies require investigation'};
 if(quality?.coverage==='incomplete')return {eligible:false,reason:'Answer-bank expansion required',queue:'coverage'};
 if(quality?.wording==='ambiguous')return {eligible:false,reason:'Wording review required',queue:'wording'};
 if(quality?.status!=='approved'||quality.wording!=='clear'||quality.coverage!=='adequate')return {eligible:false,reason:'Editorial fairness/coverage review required'};
 if(performance.wilson95.upper>maxUpper)return {eligible:false,reason:'Not reliably low success; do not recycle automatically'};
 return {eligible:true,reason:'Adequate completed-run sample; low 95% Wilson upper bound and approved fair coverage'};
}
module.exports={wilson,analyze,repeatAssessment};
