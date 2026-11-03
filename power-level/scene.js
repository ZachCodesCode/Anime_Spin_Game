/* Artwork coordinates are percentages measured on mountain-ascent.webp.
   Feet follow painted treads; camera changes framing, never earned altitude. */
(()=>{
const ROUTE=[[51,94],[38,90],[40,87],[49,84],[57,80],[61,77],[65,74],[70,71],[68,69],[57,66],[45,63],[40,60],[26,57],[19,55],[24,52],[34,49],[45,45],[55,41],[65,38],[73,36],[72,34],[60,31],[52,28],[46,25],[39,23],[29,21],[29,20],[38,18],[43,16],[46,14],[48,12],[50,10]];
const ZONES=['Foothills','Rocky ascent','Cloud line','High peaks','Summit'];
function point(progress){const y=94-Math.max(0,Math.min(1,progress))*84;for(let i=0;i<ROUTE.length-1;i++){const a=ROUTE[i],b=ROUTE[i+1];if(y<=a[1]&&y>=b[1]){const t=(a[1]-y)/(a[1]-b[1]);return {x:a[0]+(b[0]-a[0])*t,y,direction:b[0]>=a[0]?1:-1};}}return {x:50,y:10,direction:1};}
function create(stage){
stage.querySelector('.pl-arena').remove();
const view=document.createElement('div');view.className='pl-landscape';view.setAttribute('aria-hidden','true');
view.innerHTML='<div class="pl-painted-world"><img class="pl-painted-mountain" src="power-level/assets/mountain-ascent.webp" alt="" decoding="async"><div class="pl-traveller"><span class="pl-boot-shadow"></span><div class="pl-adventurer"></div><i class="pl-climb-trail"></i></div></div><img class="pl-front-clouds" src="power-level/assets/clouds.webp" alt=""><div class="pl-snow"></div>';
stage.prepend(view);view.classList.add('is-loading');const art=view.querySelector('.pl-painted-mountain');
const zone=document.createElement('span');zone.className='pl-zone';stage.append(zone);
const world=view.querySelector('.pl-painted-world'),traveller=view.querySelector('.pl-traveller'),sprite=view.querySelector('.pl-adventurer');let last=-1,lastProgress=0,lastMotion=null;
// Decode the single atlas before selecting any movement frame.
const atlas=new Image();let atlasReady=false;atlas.src='power-level/assets/adventurer-atlas.png?v=2';
Promise.all([art.decode(),atlas.decode()]).then(()=>{atlasReady=true;update(lastProgress,lastMotion);view.classList.remove('is-loading');}).catch(()=>{view.classList.remove('is-loading');});
function update(progress,motion){lastMotion=motion;const p=point(progress),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,height=2400,viewH=stage.clientHeight||480,footY=viewH*.65;
const offsetX=Math.max(stage.clientWidth-world.offsetWidth,Math.min(0,stage.clientWidth*.5-p.x/100*world.offsetWidth));
world.style.transform=`translate(${offsetX}px, ${Math.max(viewH-height,Math.min(0,footY-p.y/100*height))}px)`;
traveller.style.left=p.x+'%';traveller.style.top=p.y+'%';
const moving=atlasReady&&motion&&motion.t>0&&motion.t<1&&!reduce;
const t=motion?.t||0,hop=moving?Math.abs(Math.sin(progress*160))*10*Math.sin(Math.PI*t):0;
traveller.style.setProperty('--hop',hop+'px');
sprite.style.transform=`scaleX(${p.direction}) rotate(${moving?Math.sin(t*28)*3:0}deg)`;
const frame=moving?(motion.boost>=7000?(t<.15?3:t>.85?5:4):1+Math.floor(t*18)%2):0;
sprite.dataset.frame=String(frame);
sprite.style.backgroundPosition=`${frame*20}% 100%`;
traveller.classList.toggle('is-climbing',!!moving);view.style.setProperty('--altitude',progress);
const z=Math.min(4,Math.floor(progress*5));zone.textContent=ZONES[z]+' / '+['I','II','III','IV','V'][z];
if(last>=0&&z!==last&&progress>lastProgress){zone.classList.remove('pl-zone-arrival');void zone.offsetWidth;zone.classList.add('pl-zone-arrival');}last=z;lastProgress=progress;
}
new ResizeObserver(()=>update(lastProgress,lastMotion)).observe(stage);
return {update};
}
window.PowerLevelScene={create,point};
})();
