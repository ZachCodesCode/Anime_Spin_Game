const {db}=require('./_db');
module.exports=require('./_power-level').createHandler(db);
