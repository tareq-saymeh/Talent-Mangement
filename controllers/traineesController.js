const TraineesModel = require('../models/Trainees');
const PositionModel = require('../models/Position');
const StudentModel = require('../models/Students');
const UserModel = require('../models/User');
const trainees = async (req, res) => {
    const Trainees = await TraineesModel.find({});
    const traineeData = [];
    for (var i = 0; i < Trainees.length; i++) {
        var traStudent = Trainees[i].studentId;
        var traUser = Trainees[i].userId;
        var traPosition = Trainees[i].positionId;
        const student = await StudentModel.findOne({ _id: traStudent });
        const user = await UserModel.findOne({ _id: traUser });
        const position = await PositionModel.findOne({ _id: traPosition });
        HRID = position.userId;
        const HR = await UserModel.findOne({ _id: HRID });
        const company = await UserModel.findOne({ _id: req.session.user_id })

        
        if ( company.companyId.toString() === HR.companyId.toString()) {
        traineeData.push([student.name, user.firstName, user.lastName, position.title]);
    }
    }
    res.render('trainees/trainees', { title: 'trainees', Trainees: traineeData });
    };



const removeTrainer = async (req, res) => {
    const trainees = await TraineesModel.find({});
    if (trainees.length <= req.params.id) {
        console.error('Invalid trainee ID');
        return;
    }
    const trainee = trainees[req.params.id];
    
    if (!trainee) {
        console.error('Trainee not found');
        return;
    }
    const positionId = trainee.positionId;
    const position = await PositionModel.findOne({ _id: positionId });
    if (!position) {
        console.error('Position not found');
        return;
    }
    const positionToUpdate = position;
    positionToUpdate.status = false;
    await PositionModel.updateOne({ _id: positionToUpdate._id }, { $set: { status: positionToUpdate.status } });
    const traineeId = trainee._id;
    TraineesModel.deleteOne({ _id: traineeId }, function(err, result) {
        if (err) {
        console.error('Error deleting document:', err);
        return;
        }
        console.log('Document deleted successfully');
    });
    res.render('trainees/trainees', { title: 'trainees' });
};
module.exports = { trainees , removeTrainer};