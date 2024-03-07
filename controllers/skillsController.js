const Skill = require("../models/Skill");
const User = require('../models/User');
const Company = require('../models/Company');
var ObjectId = require('mongoose').Types.ObjectId;

/**
 * return skills page
 * @param {*}req
 * @param {*}res
 */
const viewSkills = (req, res) => {
    Skill.find({}, (err, skillList) => {
        if (err) {
            console.log(err);
        } else {
            res.render('skills/skills', {
                title: "skills",
                items: skillList,
            });
        }
    });


}



/**
 * Add Skills in the table 
 * @param {*}req
 * @param {*}res
 */
async function addSkills(req, res) {
    try {
        const user=req.session.user_id 
        const { name, description } = req.body;
        const skill = new Skill({ name: name, description: description ,userId:user });
        await skill.save();
        res.redirect('/skills') ;
      } 
      catch (err) {
        console.error('Failed to add skill', err);
        res.status(500).json({ error: 'Failed to add skill' }); }
};



/**
 * Delete Skills in the table 
 * @param {*} req 
 * @param {*} res 
 */
const deleteSkills = async(req, res) => {
    const skill = await Skill.findById(req.params.id).populate('userId');
    const userID=skill.userId._id.toString();
    const companyuser= await User.findOne({_id:userID}).populate('companyId');
    const companyID=companyuser.companyId._id.toString();

    const userSession= req.session.user_id;
    const companyUser= await User.findOne({_id:userSession}).populate('companyId');
    const companySession=companyUser.companyId._id.toString();

    if ( companyID!== companySession) {
      return res.status(401).json({ error: "Unauthorized to delete this position" });
    }

  Skill.findByIdAndDelete(req.params.id)
  .then((params) => {console.log('Skill deleted successfully');
})
  .catch((err) => {
    console.log(err);
  });
};











/**
 * Edit Skills in the table 
 * @param {*}req
 * @param {*}res
 */
async function editSkills(req, res) {
    try {
        
        const { skillId, skillDescription, newName } = req.body;
        
        const skill = await Skill.findById(skillId).populate('userId');
        const userID=skill.userId._id.toString();
        const companyuser= await User.findOne({_id:userID}).populate('companyId');
        const companyID=companyuser.companyId._id.toString();
    
        const userSession= req.session.user_id;
        const companyUser= await User.findOne({_id:userSession}).populate('companyId');
        const companySession=companyUser.companyId._id.toString();
    
        if ( companyID!== companySession) {
          return res.status(401).json({ error: "Unauthorized to delete this position" });
        }
       
        
        Skill.findOne({ _id : ObjectId(skillId) }, async function(err, result) {
            if (err) {
              res.status(500).send("server error")
            } else if (!result) {
              return res.status(400).send("Please Do not Change the SkillID ")
            } else {

                const skills = await Skill.findOneAndUpdate(
                    { _id : ObjectId(skillId)  },
                    { $set: { name: newName, description: skillDescription } },
                    { new: true }
                );
                res.redirect('/skills')
                return res.status(200);
                
            }
          });
}

    catch (err) {
        console.log("Erorr")
    }


}



/**
 * filter skills 
 * @param {*}req
 * @param {*}res
 */
 const filterSkills = (req, res) => {

    const {skills} = req.query;
    if (skills == undefined){ 
           Skill.find({}, (err, skillList) => {
        if (err) {
            console.log(err);
        } else {
            res.render('skills/skills', {
                title: "skills",
                items: skillList
              
            });
        }
    });
}
else {

    
   
    Skill.find({name:skills}, (err, skillList) => {
        if (err) {
            console.log(err);
        } else {
            res.render('skills/skills', {
                title: "skills",
                items: skillList
            });
        }
    });
}
}




module.exports = { viewSkills , editSkills , addSkills, filterSkills , deleteSkills };


