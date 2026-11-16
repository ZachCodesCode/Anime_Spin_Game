(function(root){
'use strict';
async function resolve(day) {
  const response=await fetch(`/api/ascent?challenge=1&date=${encodeURIComponent(day)}`,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw Error('Challenge unavailable');
  const challenge=await response.json();
  if(challenge.date!==day)throw Error('Challenge date mismatch');
  if(challenge.mode==='legacy')return null;
  if(challenge.mode!=='versioned' || !/^[a-f0-9]{64}$/.test(challenge.bankVersion) || !Array.isArray(challenge.rules) || challenge.rules.length!==2)throw Error('Invalid challenge');
  for(const [i,rule] of challenge.rules.entries()) {
    const expected=`/power-level/versioning/releases/${challenge.bankVersion}/${i===0?'core.js':'run.js'}`;
    if(rule.url!==expected || !/^sha256-[A-Za-z0-9+/]{43}=$/.test(rule.integrity))throw Error('Invalid rules');
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src=rule.url;script.integrity=rule.integrity;script.crossOrigin='anonymous';
      script.onload=()=>{script.remove();resolve();};script.onerror=()=>{script.remove();reject(Error('Rules unavailable'));};document.head.append(script);
    });
  }
  return {payload:challenge,core:root.PowerLevelCore,run:root.PowerLevelRun,engine:root.AscentVersionedRuntime.create(challenge,root.PowerLevelCore,root.PowerLevelRun)};
}
root.AscentChallengeClient={resolve};
})(globalThis);
