const mongoose = require('mongoose');
const Student = mongoose.model('Student', new mongoose.Schema({
  name : {type:String},
  email:{type:String , unique:true},
  studentId : { type:String , required:true , unique : true ,
  validate :{
    validator : function (Id){
      return /\d{8}/.test(Id);},
      message:props=>`${props.value} Is Not A valied Student Id `
    },
  },
  major: {type:String},
  level: {
    type: String,
    required: true,
    enum: ['freshman', 'sophomore', 'junior', 'senior']
  },
  gpa: {type:Number , min : 0 , max : 4 , default:0 },
  passwordHash:{type:String  },
  skills: [{type:mongoose.Schema.Types.ObjectId , ref:'Skill'}],
  userId : {type:mongoose.Schema.Types.ObjectId , ref:'User'} ,
  createdAt: { type: Date, default: Date.now },
}));
module.exports = Student;