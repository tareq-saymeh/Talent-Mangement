const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  telegram: {
    type: String,
    validate: {
      validator: function (Phone) {
        return /^(\d{10}|\d{12}|\d{14})$/.test(Phone);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  resetPasswordToken:{type:String},
  resetPasswordExpires:{type:Date},
  companyId : {type:mongoose.Schema.Types.ObjectId , ref:'Company'} ,
}
));

module.exports = User;