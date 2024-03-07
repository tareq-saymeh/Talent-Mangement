const express = require('express');
const router = express.Router();
const { forget } = require("../controllers/forgetController");
const { validation } = require("../controllers/validationController");
const { passwordRest } = require("../controllers/passwordRestController");
const { tokenValidation } = require("../controllers/tokenValidationController");
const authController = require('../controllers/authController');


router.get('/', authController.getLoginPage);

router.post('/', authController.checkValid);

router.post('/forgot-password', (req, res) => {
  forget(req,res);
});

router.post('/password-reset', (req, res) => {
  validation(req,res);
});

router.post('/forgot-password-by-email', (req, res) => {
  passwordRest(req,res);
});

router.post('/password-reset-by-email', (req, res) => {
  tokenValidation(req,res);
})

module.exports = router;