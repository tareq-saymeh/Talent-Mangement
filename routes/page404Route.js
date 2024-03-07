const express = require("express");
const router = express.Router();
const page404Controller = require('../controllers/page404Controller');

router.get('*', (req, res) => {
    page404Controller.page404(req,res)
});

module.exports = router