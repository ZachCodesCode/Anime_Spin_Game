// Frozen v3-1 scoring. A run saved late still scores by its own version, even after core.js changes.
const TIERS=[{min:1,name:'Common'},{min:2000,name:'Uncommon'},{min:4000,name:'Rare'},{min:7000,name:'Legendary'},{min:10000,name:'Limit Break'}];
const baseline=100;
const boost=rarity=>Math.round(1+Math.max(0,Math.min(100,rarity))*9999/100);
const tier=value=>[...TIERS].reverse().find(t=>value>=t.min)?.name||'Common';
module.exports={baseline,boost,tier};
