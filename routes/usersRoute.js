const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { checkLoggedIn } = require('../middleware/loginMiddleware')
const { session } = require('../middleware/loginMiddleware')


router.get("/", checkLoggedIn ,(req, res) => {
  usersController.viewUsers(req, res);
});

router.post("/", (req, res) => {
  if (req.body.editUserId) {
    usersController.editUser(req, res);
  } else usersController.addUser(req, res);
});

router.delete("/:id", (req, res) => {
  usersController.deleteusers(req, res);
});

module.exports = router;
