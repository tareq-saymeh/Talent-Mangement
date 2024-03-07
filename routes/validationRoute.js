const express = require("express");
const { validation } = require("../controllers/validationController");
const router = express.Router();


router.post('/forgot-password-telegram', (req, res) => {
    passwordRest(req, res);
  });