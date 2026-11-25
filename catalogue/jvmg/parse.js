'use strict';
// RDFJS terms preserve IRI identity, literal language and datatype; no network fetches.
const {StreamParser}=require('n3'),{Transform}=require('node:stream'),{pipeline}=require('node:stream/promises');
const term=t=>({type:t.termType,value:t.value,...(t.termType==='Literal'?{language:t.language,datatype:t.datatype.value}:{})});
if(require.main===module)pipeline(process.stdin,new StreamParser({format:'text/turtle',blankNodePrefix:process.argv[2]||'graph_'}),new Transform({writableObjectMode:true,transform(q,e,next){next(null,JSON.stringify([term(q.subject),term(q.predicate),term(q.object),term(q.graph)])+'\n');}}),process.stdout).catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={term};
