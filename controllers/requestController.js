const PositionModel =require('../models/Position');
const TraineesModel =require('../models/Trainees');
const StudentModel =require('../models/Students');
const UserModel =require('../models/User');

const Request = async(req,res) => {
  const positions = await PositionModel.find({});
  const privetPosition=[]
  const HR=await UserModel.findOne({_id: req.session.user_id })
  for (let i=0;i<positions.length;i++)
  {
  const user=await UserModel.findOne({_id: positions[i].userId})
  if(HR.companyId.toString()==user.companyId.toString()){
    privetPosition.push(positions[i])
  }

  }
        res.render('Requests/request' , {title:'requests',positions:privetPosition})
    }

const acceptStudent = async (req, res) => {
  const positions = await PositionModel.find({});
  const name =req.params.id
  const pos = await PositionModel.findOne({title:name});
    const positionToUpdate = pos;
    if(positionToUpdate){
      positionToUpdate.status = true;
      const stu=req.params.index
      const student = await StudentModel.findOne({studentId:stu});
      Trainees= new TraineesModel({userId:req.session.user_id ,positionId:pos._id,studentId:student._id})
      await Trainees.save();
      await PositionModel.updateOne({ _id: positionToUpdate._id }, { $set: { status: positionToUpdate.status } });
    }
  

  res.render('Requests/request', { title: 'acceptStudent', positions });
};

const declineStudent = async (req, res) => {
    const name=req.params.id
  const pos = await PositionModel.findOne({title:name});

    const positionToUpdate = pos;
      const studentToRemove = positionToUpdate.requestStudent[req.params.index];
      positionToUpdate.requestStudent.splice(req.params.index, 1);
      await PositionModel.updateOne({ _id: positionToUpdate._id }, { $pull: { requestStudent: studentToRemove } });
      console.log('Student removed successfully');


  res.redirect('Requests/request');
};



module.exports = {Request,acceptStudent,declineStudent}