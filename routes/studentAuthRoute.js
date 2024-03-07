const express = require("express");
const router = express.Router();
const studentAuth = require('../controllers/studentAuthController');
router.get('/', (req, res) => {
    studentAuth.studentAuthController(req,res)
});
router.post('/', (req, res) => {
    if(req.body.signupRePassword){
        studentAuth.signUp(req,res)
    }
    else{
        studentAuth.signIn(req,res)
    }
});
module.exports = router;