const Position = require("../models/Position");
const Skill = require("../models/Skill");
const User=require("../models/User");
const Company = require('../models/Company');




/**
 * return Positions page
 * @param {*}req
 * @param {*}res
 */
const viewPosition = (req, res) => {
        Position.find({})
                .populate('requiredSkills')
                .exec((err, positions) => {
                        if (err) {
                                console.log(err);
                        } else {
                                Skill.find({}, (err, skillList) => {
                                        if (err) {
                                                console.log(err);
                                        } else {
                                                res.render('position/position', {
                                                        title: "Positions",
                                                        items: positions,
                                                        skills: skillList
                                                });
                                        }
                                });
                        }
                });
};





/**
 * edit Positions Table
 * @param {*}req
 * @param {*}res
 */
async function addPositions(req, res) {

        try {
                const user=req.session.user_id 
                const { title, discruption ,skillsDrop , positionExpreance  } = req.body;
                const position = new Position({ title: title,discruption:discruption, yearsOfExperience: positionExpreance, requiredSkills: skillsDrop,userId:user});
                await position.save();
                res.redirect('/position') ;
                } 
                catch (err) {
                console.error('Failed to add position', err);
                res.status(500).json({ error: 'Failed to add position' }); }
};













/**
 * Delete position Table
 * @param {*} req 
 * @param {*} res 
 */
const deletePosition = async(req, res) => {
        const position = await Position.findById(req.params.id).populate('userId');
        const userID=position.userId._id.toString();
        const companyuser= await User.findOne({_id:userID}).populate('companyId');
        const companyID=companyuser.companyId._id.toString();
        //حصلت على معرف الشركة التي دخل اليها المستخدم 
        const userSession= req.session.user_id;//all id
        const companyUser= await User.findOne({_id:userSession}).populate('companyId');
        const companySession=companyUser.companyId._id.toString();
        //بدي اقارن بين معرف الشركة هاي وبين معرف الشركة للشخص الي ضاف البوزيشن 
        // Check if the user has the same company ID as the position being deleted
        // You will need to have the user's company ID available in the req.user object
        if ( companyID!== companySession) {
          return res.status(401).json({ error: "Unauthorized to delete this position" });
        }
        Position.findByIdAndDelete(req.params.id)
        .then((params) => {console.log('Position deleted successfully');
      })
        .catch((err) => {
          console.log(err);
        });
      };
      
      
      



/**
 * edit Positions Table
 * @param {*}req
 * @param {*}res
 */
async function editPositions(req, res) {
        try {
        
                const { target, newTitle, newDiscruption ,skillsDropEdit, positionExpreanceEdit, Status } = req.body
                const position = await Position.findById(target).populate('userId');
                const userID=position.userId._id.toString();
                const companyuser= await User.findOne({_id:userID}).populate('companyId');
                const companyID=companyuser.companyId._id.toString();
                //حصلت على معرف الشركة التي دخل اليها المستخدم 
                const userSession= req.session.user_id;//all id
                const companyUser= await User.findOne({_id:userSession}).populate('companyId');
                const companySession=companyUser.companyId._id.toString();
                //بدي اقارن بين معرف الشركة هاي وبين معرف الشركة للشخص الي ضاف البوزيشن 
                // Check if the user has the same company ID as the position being deleted
                // You will need to have the user's company ID available in the req.user object
                if ( companyID!== companySession) {
                  return res.status(401).json({ error: "Unauthorized to delete this position" });
                }
                if ((positionExpreanceEdit> 10 || positionExpreanceEdit < 1 )&& positionExpreanceEdit) {
                        
                        return res.status(400).json({ error: 'Wrong input ' })

                }
                else {
                
                        const updatePosition =await Position.findByIdAndUpdate(target , 
                                { $set: { title: newTitle ? newTitle : undefined ,discruption:newDiscruption, yearsOfExperience: positionExpreanceEdit ? positionExpreanceEdit : undefined , status: Status , requiredSkills: skillsDropEdit } },
                                { new: true } )

                        res.redirect('/position')
                        return res.status(200);
                }


        }
        catch (err) {
                console.log("erorr")
        }


}





/**
 * filter position 
 * @param {*}req
 * @param {*}res
 */async function filterPosition(req, res) {
        
        const { title, skills, experience, status } = req.query;     
                
        if (title == "Choose Position:" && skills==undefined && experience =="" && status=="Choose status:"){
                await Position.find({ })
                .populate('requiredSkills')
                .exec((err, positionsFillter) => {
                        if (err) {
                                console.log(err);
                        } else {
                                Skill.find({}, (err, skillList) => {
                                        if (err) {
                                                console.log(err);
                                        } else {
                                                res.render('position/position', {
                                                        title: "Positions",
                                                        items: positionsFillter,
                                                        skills: skillList
                                                });
                                           
                                        }
                                });
                        }
                });
        }
        else
        {
                const conditionOfFilter = { }
                if (title != "Choose Position:"){
                        conditionOfFilter.title = title
                }
                
                if(skills != undefined) {
                        conditionOfFilter.requiredSkills=skills
                    }
                if (experience != ""){
                        conditionOfFilter.yearsOfExperience = experience
                }
                if (status != "Choose status:"){
                        conditionOfFilter.status=status
                }
                await Position.find(conditionOfFilter)
                .populate('requiredSkills')
                .exec((err, positionsFillter) => {
                        if (err) {
                                console.log(err);
                        } else {
                                Skill.find({}, (err, skillList) => {
                                        if (err) {
                                                console.log(err);
                                        } else {
                                                res.render('position/position', {
                                                        title: "Position",
                                                        items: positionsFillter,
                                                        skills: skillList
                                                });
                                           
                                        }
                                });
                        }
                });
        }
    };





module.exports = { viewPosition, editPositions , addPositions , filterPosition  , deletePosition }






