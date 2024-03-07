const express = require("express");
const { passwordRest } = require("../controllers/forgetController");
const router = express.Router();

router.post('/forgot-password', (req, res) => {
    passwordRest(req,res);
});
