const PositionsModal = require("../models/Position");
const SkillsModal = require("../models/Skill");
const StudentModel=require('../models/Students');
const companyModel=require('../models/Company');
const userModel=require('../models/User');

const landingPage = async (req, res) => {
  PositionsModal.find({}, (err, positions) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.render("landingPage/landingPage", { title: "Landing Page", positions });

  })
};

const landingPageAboutUs = (req, res) => {
    res.render('landingPage/aboutPage', { title: 'About' })
}

const landingSearch = async(req, res) => {
    PositionsModal.find({}, (err, positions) => {
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        } 
    res.render('landingPage/landingSearch', { title: 'landingSearch', positions })}
)}

const requestSubmit= async(req,res)=>{
  const userID =await StudentModel.find({})
    stuId=userID[7]
    const pos = await PositionsModal.find({}).populate('requiredSkills')
    var count=0;
    for(let skillNum=0;skillNum<stuId.skills.length;skillNum++){
        for(let posReqS=0;posReqS< pos[req.params.id].requiredSkills.length ;posReqS++)
        {
            var stuSKILL=stuId.skills[skillNum].toString()
            var posSkill=pos[req.params.id].requiredSkills[posReqS]._id.toString()
            if(stuSKILL===posSkill){
                count++;
            }
        }
}
if(count==pos[req.params.id].requiredSkills.length){
    
  pos[req.params.id].update(
        { $push: { requestStudent: stuId.studentId } },
        (error, result) => {
            if (error) {
            console.error(error);
            }
        }
        );
        var message1='Successfully'
        var message2='Your request has been sent'
}
    else {
      var message1='Unfortunately'
      var message2='You did not meet the conditions'
    };
  res.render('landingPage/requestSubmit',{title:'requestSubmit',message2,message1})
}

  const landingPos = async (req, res) => {
    try {
      const userID = await StudentModel.find({});
      const stuId = userID[7];
      const id=req.params.id
      const pos=await PositionsModal.find({}).populate('userId')
          let HRId=pos[id].userId
          let HR=await userModel.findOne({_id:HRId})
          let CompanyID=HR.companyId
          let Company = await companyModel.findOne({ _id:CompanyID})
          let CompanyName=Company.title
      SkillsModal.find({}, (err, Skill) => {
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
        PositionsModal.find({}, (err, Positions) => {
          if (err) {
            console.log(err);
            return res.sendStatus(400);
          }
          if (Positions.length === 0) {
            console.log("No positions found.");
            return res.sendStatus(404);
          }
          if (!Positions[id]) {
            return res.sendStatus(404);
          }
          var skillSize=0;
          var skillAvailable=0;
          var i=0;
          for(var posRS=0;posRS<Positions[id].requiredSkills.length;posRS++){
              skillSize++;
              for(var studentSkill=0;studentSkill<stuId.skills.length;studentSkill++)
              {
                i++;
                  var posSk=Positions[id].requiredSkills[posRS].toString()
                  var stuSkill=stuId.skills[studentSkill]._id
                  if(posSk==stuSkill){
                      skillAvailable++;
                  }
              }
          }
          var percent=(skillAvailable/skillSize)*100
          res.render('landingPage/landingPos', { title: 'landingPos',Skill:Skill,id:id,percent:percent, positions:Positions,CompanyName:CompanyName})
      }); });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
};
module.exports = { landingPage, landingPageAboutUs, landingSearch ,landingPos,requestSubmit}