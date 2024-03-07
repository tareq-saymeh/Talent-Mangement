const mongoose = require('mongoose');

const Company = mongoose.model('Company', new mongoose.Schema({

    title: { type:String, unique: true, required: true }, 
    phone:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
}, { timestamps: true }));

module.exports = Company;



