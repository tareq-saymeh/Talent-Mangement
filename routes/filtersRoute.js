const express = require("express");
const router = express.Router();
const UserModal = require('../models/User')
const filterPageController = require('../controllers/filterPageController');
const { checkLoggedIn } = require('../middleware/loginMiddleware')

router.get('/', checkLoggedIn, (req, res) => {

    if (req.query.skills1 || req.query.skills2) {
      filterPageController.viewFilterPage(req, res);
    } else
      filterPageController.viewStudents(req, res);
  }


);

module.exports = router;