'use strict';
// Bounded local records only. No HTML fetching, crawling, NLP service or live API.
const crypto=require('node:crypto');
const tags={
 'curly hair':['appearance.hairstyle','curly'],'straight hair':['appearance.hairstyle','straight'],'wavy hair':['appearance.hairstyle','wavy'],'ponytail':['appearance.hairstyle','ponytail'],'twin-tails':['appearance.hairstyle','twin_tails'],'braids':['appearance.hairstyle','braids'],
 'goatee':['appearance.facial_hair','goatee'],'beard':['appearance.facial_hair','beard'],'mustache':['appearance.facial_hair','mustache'],
 'satchel':['appearance.carried_accessory','satchel'],'bag':['appearance.carried_accessory','bag'],'backpack':['appearance.carried_accessory','backpack'],
 'boots':['appearance.clothing','boots'],'t-shirt':['appearance.clothing','t_shirt'],'suspenders':['appearance.clothing','suspenders'],'overalls':['appearance.clothing','overalls'],'armour':['appearance.clothing','armour'],'armor':['appearance.clothing','armour'],'uniform':['appearance.clothing','uniform'],'dress':['appearance.clothing','dress'],
 'hat':['appearance.accessory','hat'],'wristband':['appearance.accessory','wristband'],'bandages':['appearance.accessory','bandages'],'bandana':['appearance.accessory','bandana'],'headband':['appearance.accessory','headband'],'belt':['appearance.accessory','belt'],'jewellery':['appearance.accessory','jewellery'],
 'goggles':['appearance.eyewear','goggles'],'glasses':['appearance.eyewear','glasses'],'sunglasses':['appearance.eyewear','sunglasses'],
 'sniper':['occupation.role','sniper'],'pirate':['occupation.role','pirate'],'detective':['occupation.detective','professional'],'assassin':['occupation.role','assassin'],'thief':['occupation.role','thief'],'police officer':['occupation.role','police_officer'],'maid':['occupation.role','maid'],'teacher':['occupation.role','teacher'],'doctor':['occupation.role','doctor'],'mage':['occupation.role','mage'],'athlete':['occupation.role','athlete'],'military personnel':['occupation.role','military_personnel'],
 'long nose':['appearance.physical_feature','long_nose'],'big lips':['appearance.physical_feature','big_lips']
};
const key=s=>String(s).normalize('NFKC').trim().toLowerCase().replace(/_/g,' ').replace(/\s+/g,' ');
const fieldAliases={age:'ages',alias:'aliases','alternate names':'aliases',japanese_name:'japaneseName',role:'characterRole',sex:'gender',hair_color:'hairColour',hair_colour:'hairColour',hair_length:'hairLength',eye_color:'eyeColour',eye_colour:'eyeColour',apparent_age:'apparentAge',birthday:'birthday',height:'height',zodiac:'zodiac',personality:'personality',favourite_food:'favouriteFood',favorite_food:'favouriteFood',occupation:'occupations',position:'positions',species:'species',race:'race',abilities:'abilities',powers:'abilities',organizations:'affiliations',crew:'crewMembership',family:'family',friends:'friendships',rivals:'rivalries',enemies:'enemies',romantic:'romanticRelationships',devil_fruit:'devilFruit'};
const fields=['eyewear','hairstyles','facialHair','physicalFeatures','accessories','carriedAccessories','aliases','japaneseName','characterRole','gender','eyeColour','hairColour','hairLength','apparentAge','ages','height','birthday','zodiac','personality','favouriteFood','occupations','positions','species','race','abilities','affiliations','crewMembership','family','friendships','rivalries','enemies','romanticRelationships','devilFruit','weapons','clothing','transformations','goals','relationships','extractions'];
const relationships=new Set(['family_unspecified','parent','mother','father','sibling','brother','sister','child','son','daughter','partner','spouse','friend','rival','enemy','mentor','student','crew_mate','colleague','romantic_partner']);
const list=x=>x===undefined?[]:Array.isArray(x)?x:[x];
const digest=x=>crypto.createHash('sha256').update(String(x)).digest('hex');
function redact(input){
 if(Array.isArray(input))return input.map(redact);
 if(typeof input==='string'&&input.length>500)return {retained:false,sha256:digest(input),characters:input.length};
 if(!input||typeof input!=='object')return input;
 return Object.fromEntries(Object.entries(input).map(([k,v])=>[/biography|description|longText/i.test(k)?k:k,/biography|description|longText/i.test(k)?{retained:false,sha256:digest(typeof v==='string'?v:JSON.stringify(v)),characters:typeof v==='string'?v.length:null}:redact(v)]));
}
function context(defaultScope,input={}){
 const scope=[defaultScope,input.scope,input.period?`period: ${input.period}`:null,input.outfit?`outfit: ${input.outfit}`:null].filter(Boolean).join('; ');
 return {animeId:input.animeId||null,scope,persistence:input.persistence||'unknown',form:input.form||input.outfit||null};
}
function birthday(value){
 if(value&&typeof value==='object'){const m=Number(value.month),d=Number(value.day),y=value.year==null?null:Number(value.year);if(!Number.isInteger(m)||!Number.isInteger(d)||y!==null&&!Number.isInteger(y))throw Error('Invalid birthday');const date=new Date(Date.UTC(y||2000,m-1,d));if(date.getUTCMonth()!==m-1||date.getUTCDate()!==d||y!==null&&date.getUTCFullYear()!==y)throw Error('Invalid birthday');return (y===null?'--':String(y).padStart(4,'0')+'-')+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');}
 if(/^--\d\d-\d\d$/.test(String(value)))return birthday({month:Number(value.slice(2,4)),day:Number(value.slice(5))});
 const m=/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2})$/i.exec(String(value));if(m)return birthday({month:['january','february','march','april','may','june','july','august','september','october','november','december'].indexOf(m[1].toLowerCase())+1,day:Number(m[2])});
 const iso=/^(\d{4})-(\d\d)-(\d\d)$/.exec(String(value));if(iso)return birthday({year:Number(iso[1]),month:Number(iso[2]),day:Number(iso[3])});throw Error('Birthday needs explicit month/day; no zodiac inferred');
}
function height(value){const n=typeof value==='object'?value.value:Number((/^(\d+(?:\.\d+)?)\s*(?:cm|m)$/.exec(String(value))||[])[1]),unit=typeof value==='object'?value.unit:(/\b(cm|m)$/.exec(String(value))||[])[1];if(!Number.isFinite(Number(n))||Number(n)<0||!['cm','m'].includes(unit))throw Error('Height requires explicit cm or m units');return Number(n)*(unit==='m'?100:1);}
Object.assign(tags, Object.fromEntries([
 ...['ninja','samurai','musician','scientist','chef','healer','wizard','witch'].map(v=>[v,['occupation.role',v]]),
 ...['human','elf','demon','vampire','ghost','robot','giant','spirit'].map(v=>[v,['identity.species',v]]),
 ...['sword','gun','bow','staff','slingshot','shield'].map(v=>[v,['equipment.weapon',v]]),
 ...['coat','cape','gloves','shirt'].map(v=>[v,['appearance.clothing',v]]),
 ...['tsundere','shy','courageous','cowardly','mischievous'].map(v=>[v,['profile.personality',v]]),
 ...['lightning','healing','telepathy','magic'].map(v=>[v,['ability.named_power',v]])
]));
function profileSource(snapshot,manifest){
 if(snapshot.format!=='anime-ascent-character-profiles-v1'||!snapshot.revision||!Number.isFinite(Date.parse(snapshot.retrievedAt))||!Array.isArray(snapshot.profiles)||snapshot.profiles.length>50000)throw Error('Invalid bounded profile packet');
 const supplied=snapshot.acquisition==='user-supplied';
 const acdbHosts=p=>{try{return ['animecharactersdatabase.com','www.animecharactersdatabase.com'].includes(new URL(p.sourceUrl).hostname);}catch{return false;}};const isAcdb=snapshot.profiles.length>0&&snapshot.profiles.every(acdbHosts);
 if(snapshot.sourceProvider==='ACDB'&&!isAcdb)throw Error('Declared ACDB profiles must use their actual ACDB source URLs');
 if(!isAcdb&&(!manifest?.enabled||!['CC0-1.0','authorized-feed','individual-fact-review'].includes(manifest.permission)))throw Error('Non-ACDB profiles require a trusted source permission manifest');
 if(manifest?.tagMappings&&(!manifest.enabled||!manifest.reviewedBy?.trim()||!Number.isFinite(Date.parse(manifest.reviewedAt))))throw Error('Custom tag mappings need an actual local maintainer configuration');
 if(!supplied&&!manifest?.enabled)throw Error('Extended exports need an actual locally configured permission manifest');
 if(!supplied&&(!manifest.reviewedBy?.trim()||!manifest.permissionUrl||!Number.isFinite(Date.parse(manifest.reviewedAt))))throw Error('Actual extended-export permission review required');
 const records=snapshot.profiles.map((p,index)=>{
  if(!p.externalId||typeof p.name!=='string'||p.name.length>200||!/^https:\/\//.test(p.sourceUrl||''))throw Error('Profile source ID, name and source URL required');
  if(isAcdb&&(!/^\d+$/.test(String(p.externalId))||new URL(p.sourceUrl).searchParams.get('id')!==String(p.externalId)))throw Error('ACDB profile URL and external ID disagree');
  if(!supplied&&!manifest.hosts?.includes(new URL(p.sourceUrl).hostname))throw Error('Profile host outside authorized export');
  let assignments=list(p.appearances||p.animeAssignments);
  const f=Object.create(null);for(const [name,v]of Object.entries(p.fields||{})){const canonical=fieldAliases[name]||name;if(Object.hasOwn(f,canonical))throw Error('Duplicate profile field aliases; use a multi-valued field');f[canonical]=v;}
  for(const name of fields)if(p[name]!==undefined&&f[name]===undefined)f[name]=p[name];
  if(!assignments.length)assignments=list(f.appearances||f.animeAssignments||p.animeAppearances||f.animeAppearances);
  const primary=p.primaryAnime||f.primaryAnime;if(primary){const a=typeof primary==='string'?{title:primary}:primary;assignments=[{...a,media:a.media||'anime',primary:true},...assignments];}
  const anime=assignments.filter(a=>a.media==='anime'),chosen=anime.filter(a=>a.primary);
  const matchAssignments=chosen.length===1?chosen:anime;
  const facts=[],coverage=[],base=context('Source-reported profile; recurrence and outfit/period unspecified',p.context);
  function emit(traitId,value,field,original,extra={}){const long=typeof value==='string'&&value.length>500;facts.push({traitId:long?'source.unmapped_profile_field':traitId,value:long?'Long text retained by hash only':value,url:p.sourceUrl,locator:`profile ${p.externalId}: ${field}`,fact:`Source-reported ${field}: ${typeof value==='string'&&value.length<=300?value:JSON.stringify(redact(value)).slice(0,300)}. Not independently verified.`,context:base,rawField:field,rawValue:redact(original),sourceType:'profile',...extra});}
  for(const [i,t]of list(p.tags).entries()){const label=typeof t==='string'?t:t.label;if(typeof label!=='string'||!label.trim()||label.length>200)throw Error('Tags need bounded nonempty labels');const mapped=manifest?.tagMappings?.[key(label)]||tags[key(label)];emit(mapped?.[0]||'source.unmapped_tag',mapped?.[1]||label,'tags['+i+']',label,{sourceType:'tag',rawLabel:label,context:context('Source-reported profile; chronology, outfit and recurrence unspecified',typeof t==='object'?{...p.context,...t.context}:p.context)});coverage.push({field:'tag',original:label,mappingAvailable:!!mapped,traitId:mapped?.[0]||null,reason:mapped?null:'No exact reviewed tag mapping'});}
  const identifiers=redact({name:p.name,aliases:list(f.aliases),japaneseName:f.japaneseName??null});
  for(const [field,raw]of Object.entries(f)){
   if(/biography|description|longText/i.test(field)){coverage.push({field,retained:'hash-only',reason:'Long descriptions are not copied'});continue;}
   if(['primaryAnime','appearances','animeAssignments','animeAppearances'].includes(field)){coverage.push({field,retained:'media-assignments'});continue;}
   if(['aliases','japaneseName'].includes(field)){if(field==='aliases')for(const a of list(raw))emit('identity.alias',a,field,a);coverage.push({field,retained:'identifier-metadata'});continue;}
   if(['family','friendships','rivalries','enemies','romanticRelationships','relationships'].includes(field)){
    const defaultType={family:'family_unspecified',friendships:'friend',rivalries:'rival',enemies:'enemy',romanticRelationships:'romantic_partner'}[field];
    for(const [i,r]of list(raw).entries()){const item=typeof r==='string'?{target:{name:r}}:r,target=typeof item.target==='string'?{name:item.target}:item.target||{name:item.name};const type=item.type||defaultType;emit(type==='family_unspecified'||['parent','mother','father','sibling','brother','sister','child','son','daughter'].includes(type)?'relationship.family':'relationship.character',target?.name||target?.canonicalId||'Unresolved target',`${field}[${i}]`,r,{relationship:{type:relationships.has(type)?type:null,rawType:type||'unspecified',target},context:context('Source-reported relationship; period unresolved',{...p.context,...item.context})});}
    coverage.push({field,retained:'typed-relationships'});continue;
   }
   if(field==='extractions'){for(const [i,e]of list(raw).entries()){if(!e.fact||e.fact.length>400||!e.locator||!e.traitId)throw Error('Prose extractions need bounded factual summaries, explicit locator and trait mapping');emit(e.traitId,e.value,`extractions[${i}]`,{locator:e.locator,summary:e.fact},{...redact(e),extraction:e.extraction==='ai_proposal'?'ai_proposal':'editorial_summary',context:context('Prose-derived candidate; interpretation needs review',{...p.context,...e.context})});}coverage.push({field,retained:'short-extracted-facts-only'});continue;}
   const direct={eyewear:'appearance.eyewear',hairstyles:'appearance.hairstyle',facialHair:'appearance.facial_hair',physicalFeatures:'appearance.physical_feature',accessories:'appearance.accessory',carriedAccessories:'appearance.carried_accessory',characterRole:'identity.story_role',gender:'identity.gender',eyeColour:'appearance.eye_color',hairColour:'appearance.hair_color',hairLength:'appearance.hair_length',apparentAge:'profile.apparent_age',zodiac:'profile.zodiac',personality:'profile.personality',favouriteFood:'profile.favourite_food',occupations:'occupation.role',positions:'occupation.role',species:'identity.species',race:'identity.race',abilities:'ability.named_power',affiliations:'affiliation.membership',crewMembership:'affiliation.membership',devilFruit:'ability.devil_fruit',weapons:'equipment.weapon',clothing:'appearance.clothing',transformations:'ability.transformation',goals:'profile.goal'};
   for(const [i,v]of list(raw).entries()){
    const item=v&&typeof v==='object'&&!Array.isArray(v)?v:{value:v},value=Object.hasOwn(item,'value')?item.value:item.name??v;let traitId=direct[field],normalized=value,hold;
    try{if(field==='ages'){const n=typeof value==='number'?value:/^\d+(?:\.\d+)?$/.test(String(value))?Number(value):null;traitId=n===null?'profile.stated_age':'profile.age';normalized=n===null?String(value):n;}
     else if(field==='height'){traitId='profile.height_cm';normalized=height(v);}
     else if(field==='birthday'){traitId='profile.birthday';normalized=birthday(v);}
     else if(['gender','eyeColour','hairColour','hairLength','apparentAge','occupations','positions','species','eyewear','facialHair'].includes(field))normalized=String(value).toLowerCase().replace(/[ -]/g,'_');
    }catch(e){hold=e.message;traitId='source.unmapped_profile_field';normalized=typeof value==='string'?value:JSON.stringify(value);}
    if(!traitId){traitId='source.unmapped_profile_field';normalized=typeof value==='string'?value:JSON.stringify(redact(value));hold='No reviewed profile-field mapping';}
    const tagMapping=tags[key(String(value))];if(tagMapping&&(tagMapping[0]===traitId||['accessories','carriedAccessories','clothing'].includes(field)&&tagMapping[0].startsWith('appearance.'))){traitId=tagMapping[0];normalized=tagMapping[1];}
    emit(traitId,normalized,`${field}[${i}]`,v,{normalizationHold:hold||null,context:context('Source-reported profile; chronology, outfit and recurrence unspecified',{...p.context,...item.context,...(item.period?{period:item.period}:{})})});
   }
   if(['affiliations','crewMembership'].includes(field))for(const [i,entry]of list(raw).entries())if(entry&&typeof entry==='object'&&entry.role&&entry.name)emit('affiliation.role',entry.role+' @ '+entry.name,`${field}[${i}].role`,entry,{context:context('Source-reported organization role; period unresolved',{...p.context,...entry.context})});
   coverage.push({field,retained:'claims-or-held-observations'});
  }
  const recognized=new Set(['externalId','name','sourceUrl','fields','tags','appearances','animeAssignments','context','primaryAnime','animeAppearances','canonicalId','malId',...fields]);
  for(const [field,value]of Object.entries(p))if(!recognized.has(field)&&!/biography|description|longText/i.test(field))emit('source.unmapped_profile_field',typeof value==='string'?value:JSON.stringify(redact(value)),field,redact(value));
  return {externalId:String(p.externalId),name:p.name,animeNames:matchAssignments.map(a=>a.title).filter(Boolean),...(matchAssignments.length===1&&matchAssignments[0].canonicalAnimeId?{animeId:matchAssignments[0].canonicalAnimeId}:{}),...(p.canonicalId?{canonicalId:p.canonicalId}:{}),...(p.malId?{malId:p.malId}:{}),facts,profileMetadata:{identifiers,appearances:assignments,coverage,missingFields:fields.filter(k=>f[k]===undefined),descriptionRetention:redact(Object.fromEntries(Object.entries(p).filter(([k])=>/biography|description|longText/i.test(k)))),acquisition:snapshot.acquisition}};
 });
 return {normalizationVersion:1,provider:isAcdb?'acdb-profile':manifest.id,identityNamespace:isAcdb?'acdb':manifest.id,originFamily:isAcdb?'acdb-community':manifest.originFamily||manifest.id,kind:isAcdb?'dataset':manifest.kind||'dataset',structured:true,permission:isAcdb?'unresolved':manifest.permission,license:isAcdb?'ODbL-1.0 + DbCL-1.0':manifest.license||manifest.permission,permissionUrl:isAcdb?'https://www.animecharactersdatabase.com/databasedumps.php':manifest.permissionUrl,publicationHold:isAcdb||manifest.publicationCleared!==true,acquisition:snapshot.acquisition,revision:String(snapshot.revision),retrievedAt:snapshot.retrievedAt,records};
}
function validateState(state,deps){
 const V=require('../../verification/model'),T=require('../model'),seen=new Set();
 for(const p of state.sourceProfiles||[]){const body={...p};delete body.id;if(p.id!==V.hash(body)||seen.has(p.id)||!deps.characters.has(p.characterId)||!/^[a-f0-9]{64}$/.test(p.snapshotHash)||!p.metadata?.identifiers)throw Error('Invalid source profile metadata');seen.add(p.id);}
 const links=new Set(),claims=new Map(state.traits.associations.map(a=>[a.id,a]));
 for(const r of state.profileRelations||[]){const body={...r};delete body.id;delete body.claimId;if(r.id!==V.hash(body)||links.has(r.id)||!deps.characters.has(r.subjectId)||r.targetId&&!deps.characters.has(r.targetId)||r.targetId===r.subjectId||!['unmapped',...relationships].includes(r.relation))throw Error('Invalid typed relationship');links.add(r.id);
  if(r.claimId){const c=claims.get(r.claimId)&&T.latest(claims.get(r.claimId)).claim;if(!c||!r.targetId||c.characterId!==r.subjectId||c.value!==r.relation+'|'+r.targetId||!['relationship.family','relationship.character'].includes(c.traitId)||V.hash(c.context)!==V.hash(r.context))throw Error('Relationship claim/link mismatch');}
 }
 return state;
}
module.exports={tags,fields,relationships,context,birthday,height,redact,profileSource,validateState};
