const express = require("express");
const router = express.Router();

const requestController = require('../controllers/RequestController');
const {checkLoggedIn} = require('../middleware/loginMiddleware')

router.get('/', checkLoggedIn,(req, res) => {
    requestController.Request(req,res)
});

router.get('/:id/:index',(req,res)=>{
    requestController.acceptStudent(req,res)
})
router.get('/decline/:id/:index',(req,res)=>{
    requestController.declineStudent(req,res)
})

module.exports = router