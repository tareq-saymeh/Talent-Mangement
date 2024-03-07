const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");
const { checkLoggedIn } = require("../middleware/loginMiddleware");

router.get("/", checkLoggedIn, async (req, res) => {
  
  if(req.query.positionID){
    studentsController.filterStudent(req, res);
  }
  else
    if (req.query.search) {
    } else if (req.query.skills || req.query.gpa || req.query.level ) {
      studentsController.filterStudent(req, res);
    } else {
      studentsController.viewStudents(req, res);
    }
})
router.post("/", (req, res) => {
  if (req.body.editStudID) {
    studentsController.editStudent(req, res);
  } else studentsController.addStudent(req, res);
});
router.delete("/:id", (req, res) => {
    studentsController.deleteStudents(req, res);
});

router.get('/searchStudent',(req,res)=>{
    studentsController.studentSearch(req,res)
})
module.exports = router;