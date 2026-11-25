// Immutable historical reconstruction from the pre-November-25 selector on main.
// These IDs reproduce the original code's output; deployment and completed-run attribution
// have not been independently verified. Never edit a played date or its question bank entries.
(function(root){
'use strict';
const assignments={
 '2026-11-20':['timed-v4-descent-one-piece','timed-v4-descent-demon-slayer','timed-v4-descent-gundam','timed-v4-descent-gen1-pokemon','timed-v4-descent-jjk','timed-v4-descent-jojo-stands','timed-v4-descent-spy-family'],
 '2026-11-21':['timed-v4-descent-naruto','timed-v4-descent-my-hero-academia','timed-v4-descent-dragon-ball-titles','timed-v4-descent-ghibli-characters','timed-v4-descent-aot','timed-v4-descent-zanpakuto','timed-v4-descent-magical-girls'],
 '2026-11-22':['timed-v4-descent-protagonists','timed-v4-descent-dragon-ball','timed-v4-descent-devil-fruits','timed-v4-descent-chainsaw-man','timed-v4-descent-hxh','timed-v4-descent-pokemon-moves','timed-v4-descent-villains'],
 '2026-11-23':['timed-v4-descent-swordsmen','timed-v4-descent-demon-slayer-demons','timed-v4-descent-mha-quirks','timed-v4-descent-bleach','timed-v4-descent-rivals','timed-v4-descent-naruto-jutsu','timed-v4-descent-pokemon-anime'],
 '2026-11-24':['timed-v4-descent-one-piece','timed-v4-descent-demon-slayer','timed-v4-descent-gundam','timed-v4-descent-gen1-pokemon','timed-v4-descent-jjk','timed-v4-descent-jojo-stands','timed-v4-descent-spy-family'],
 '2026-11-25':['timed-v4-descent-masked-characters','timed-v4-descent-white-hair','timed-v4-descent-sports-anime','timed-v4-descent-fire-users','timed-v4-descent-assassins','timed-v4-descent-anime-films','timed-v4-descent-chefs'],
 '2026-11-26':['timed-v4-descent-fma-characters','timed-v4-descent-death-note-characters','timed-v4-descent-manhwa-anime','timed-v4-descent-one-punch-man-characters','timed-v4-descent-fairy-tail-characters','timed-v4-descent-shojo-anime','timed-v4-descent-tokyo-ghoul-characters']
};
const reuse={}; // Future date -> question ID -> {approvedBy, reviewedAt, runs, acceptedRate, topRate, evidence}
const policy={minRuns:30,maxAcceptedRate:0.60,maxTopRate:0.30};
const api={assignments,reuse,policy};
if(typeof module!=='undefined')module.exports=api;else root.PowerLevelDescentAssignments=api;
})(globalThis);
