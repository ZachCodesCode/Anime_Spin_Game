'use strict';
const fs=require('node:fs'),path=require('node:path'),D=require('./index'),S=require('../traits/importer/store');
function options(args){const o={};for(let i=0;i<args.length;i+=2){if(!['--input','--mode','--date','--output','--packet','--config','--evidence','--ref','--release','--question-ids','--question-map','--maintainer','--record'].includes(args[i])||args[i+1]===undefined)throw Error('Unknown/missing daily-content option');o[args[i].slice(2)]=args[i+1];}return o;}
const read=file=>JSON.parse(fs.readFileSync(S.privateFile(file),'utf8'));
function loadPacket(o){if(o.packet)return D.validatePacket(read(o.packet));let bank,sourceHash,revision=null,bankVersion=null;
 if(o.release){const r=D.release(o.release);({bank,sourceHash,bankVersion}=r);}else if(o.ref){const r=D.trustedBank(o.ref);({bank,sourceHash,revision}=r);}else{
 if(!o.input)throw Error('Provide --input CSV/JSON, --packet, --ref, or --release');const raw=new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(S.privateFile(o.input)));if(Buffer.byteLength(raw)>32*1024*1024)throw Error('Content input exceeds 32 MiB');sourceHash=require('node:crypto').createHash('sha256').update(raw).digest('hex');bank=o.input.endsWith('.csv')?D.fromCSV(raw,o.mode,o['question-map']?read(o['question-map']):{}):JSON.parse(raw);}
 if(o['question-ids']){const ids=o['question-ids'].split(',');if(ids.some(id=>!bank.some(q=>q.id===id)))throw Error('Unknown selected question');bank=bank.filter(q=>ids.includes(q.id));}
 return D.packet({bank,mode:o.mode,challengeDate:o.date,sourceHash,revision,bankVersion,evidence:o.evidence?read(o.evidence):{}});
}
function config(o){const c=read(o.config||process.env.ASCENT_DAILY_CONFIG);if(!c.database)throw Error('Configure existing database; enrichment cannot be skipped');c.database=S.privateFile(c.database);return c;}
function confirm(o,c){const r=read(o.record),roster=read(c.maintainers||path.resolve(__dirname,'../private/phase5b3/maintainers.json'));
 if(!o.maintainer||!roster.reviewers?.includes(o.maintainer))throw Error('Actual configured maintainer required');
 if(!['ascent','descent'].includes(r.mode)||!r.publicationReference||!r.assignmentReference||!r.bankVersion||!Array.isArray(r.questionIds)||!r.questionIds.length)throw Error('Actual publication and assignment evidence required');
 const frozen=D.release(path.join(path.resolve(__dirname,'../../power-level/versioning/releases'),r.bankVersion));if(r.questionIds.some(id=>!frozen.bank.some(q=>q.id===id&&(r.mode==='descent'?q.descent:!q.descent))))throw Error('Confirmed IDs/mode absent from immutable bank');require('../../power-level/scheduling/fresh').plus(r.date,0);
 return D.python('confirm',c.database,{...r,confirmedBy:o.maintainer,confirmationBasis:'Configured maintainer attestation with retained publication and actual-assignment references; not inferred from proposed schedules'});
}
function main(args=process.argv.slice(2)){
 const command=args.shift(),o=options(args);if(command==='inventory')return D.inventory({ref:o.ref||'origin/main',database:o.config?config(o).database:undefined,research:o.config?(config(o).research||[]):[],output:o.output});
 if(command==='confirm-usage')return confirm(o,config(o));
 if(!['handoff','integrate','preview'].includes(command)||!o.output)throw Error('Commands: handoff, preview, integrate (--output private directory); inventory; confirm-usage');
 const p=loadPacket(o),directory=path.dirname(S.privateFile(path.join(o.output,'packet.json')));fs.mkdirSync(directory,{recursive:true,mode:0o700});S.snapshot(path.join(directory,'packet.json'),p);
 if(command==='handoff')return {status:'HANDOFF_ONLY_NOT_INTEGRATED',packetId:p.id,packet:path.join(directory,'packet.json'),next:'Run daily:integrate on the shared tooling checkout; content integration is not complete until its enrichment receipt succeeds',published:false};
 const c=config(o);return D.apply(p,{database:c.database,output:directory,sources:c.sources||[],metadata:c.metadata?read(c.metadata):{},legacy:c.reviewState?read(c.reviewState):undefined,dryRun:command==='preview'});
}
if(require.main===module){try{console.log(JSON.stringify(main(),null,2));}catch(e){console.error('Daily integration FAILED: '+e.message+'\nNo successful integration receipt was issued. Preserve the output/backup, inspect any export-pending state, and retry as documented.');process.exitCode=1;}}
module.exports={main,loadPacket,confirm};
