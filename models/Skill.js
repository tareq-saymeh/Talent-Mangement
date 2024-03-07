const mongoose = require('mongoose');


const Skill = mongoose.model('Skill', new mongoose.Schema({
  name : {type:String , unique: true ,required:true},
  description : {type:String},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}));

module.exports = Skill;
/*
1=> react
2=> node
5=> html

*/
  // value : {type:Number , unique:true ,required:true},