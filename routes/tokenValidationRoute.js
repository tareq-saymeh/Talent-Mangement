const express = require("express");
const { tokenValidation } = require("../controllers/tokenValidationController");
const router = express.Router();

router.post('/password-reset-by-email', async (req, res) => {
    tokenValidation(req,res);
})
