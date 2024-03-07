const express = require("express");
const router = express.Router();
const traineesController = require('../controllers/traineesController');
const { checkLoggedIn } = require("../middleware/loginMiddleware");

router.get('/', checkLoggedIn, (req, res) => {
    traineesController.trainees(req,res)
});
router.get('/:id',(req, res) => {
    traineesController.removeTrainer(req,res)
});
module.exports = router
