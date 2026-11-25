// Add reviewed Descent questions here, seven at a time (five char, two title).
// Each entry needs a unique id, shared semantic conceptId, descent kind, text,
// note, top, and answers [{name, aliases:[], rarity}]. Existing question IDs
// remain in questions.js to preserve published bank and player scores.
(function(root){
'use strict';
const questions=[];
if(typeof module!=='undefined')module.exports=questions;else root.PowerLevelDescentQuestions=questions;
})(globalThis);
