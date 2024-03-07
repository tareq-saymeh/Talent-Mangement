const mongoose = require('mongoose');

const Position = mongoose.model('Position', new mongoose.Schema({
   title: { type: String, unique: true, required: true }, 
   requiredSkills: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }
   ],
   requestStudent: [
      { type: mongoose.Schema.Types.String, ref: 'Student' }
   ],

   discruption :{type: String},
   yearsOfExperience: { type: Number },
   status: { type: Boolean , default : false},
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true }));

module.exports = Position;