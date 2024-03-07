const mongoose = require('mongoose');


const Trainees = mongoose.model('Trainees', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,required: true ,ref: 'User' },
    studentId: { type: mongoose.Schema.Types.ObjectId,required: true, ref: 'Student' },
    positionId: { type: mongoose.Schema.Types.ObjectId,required: true, ref: 'Position' }
}));

module.exports = Trainees;