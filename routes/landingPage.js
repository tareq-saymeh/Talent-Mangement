const express = require("express");
const router = express.Router();
const landingController = require('../controllers/landingPageController');

router.get( '/',(req, res) => {
    landingController.landingPage(req,res)
});

router.get( '/AboutUs',(req, res) => {
    landingController.landingPageAboutUs(req,res)
});
router.get( '/landingSearch',(req, res) => {
    landingController.landingSearch(req,res)
});
router.get('/RequestSubmit/:id',async(req,res)=>{
    landingController.requestSubmit(req,res)
})
router.get('/landingPos/:id', (req, res) => {

    landingController.landingPos(req,res)

})
module.exports = router