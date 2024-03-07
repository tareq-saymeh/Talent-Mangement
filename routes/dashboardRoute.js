const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { checkLoggedIn } = require('../middleware/loginMiddleware')

router.get('/',checkLoggedIn, (req, res) => {

        dashboardController.viewDashboard(req, res)
  }

);

module.exports = router