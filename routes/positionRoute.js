const express = require("express");
const router = express.Router();
const positionController = require("../controllers/positionController");
const searchController = require("../controllers/searchController");
const { checkLoggedIn } = require("../middleware/loginMiddleware");

router.get("/", checkLoggedIn,async (req, res) => {

    if (req.query.search) {
    await  searchController.searchPosition(req, res);
    } else if (req.query.title) {
      positionController.filterPosition(req, res);
    } else {
      positionController.viewPosition(req, res);
    }
});


router.post("/", (req, res) => {
  if (req.body.target) {
    positionController.editPositions(req, res);
  } else positionController.addPositions(req, res);
});

router.delete("/:id", (req, res) => {
  positionController.deletePosition(req, res);
});

module.exports = router;
