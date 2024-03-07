const express=require('express')
const router= express.Router();
const skillsController=require('../controllers/skillsController');
const searchController = require('../controllers/searchController');
const { checkLoggedIn } = require('../middleware/loginMiddleware')

router.get('/',checkLoggedIn,async(req,res)=>{
        if(req.query.search){
            await searchController.searchSkill(req,res)
        }
        else if(req.query.skills){
            skillsController.filterSkills(req,res);
        }
        else{
            skillsController.viewSkills(req, res);
        }
});
router.post('/',(req,res)=>{
    if(req.body.skillId){
        skillsController.editSkills(req,res);
    }
    else
    skillsController.addSkills(req,res);
});
router.delete("/:id", (req, res) => {
    skillsController.deleteSkills(req, res);
});
module.exports=router;