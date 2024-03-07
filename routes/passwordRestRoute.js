const express = require("express");
const { passwordRest } = require("../controllers/passwordRestController");
const router = express.Router();

router.post('/forgot-password-by-email', (req, res) => {
    passwordRest(req,res);
});