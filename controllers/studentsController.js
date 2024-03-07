const Student = require("../models/Students")
const Skill = require('../models/Skill');
const Positions = require('../models/Position');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * return Students page
 * @param {*}req
 * @param {*}res
 */
const viewStudents = (req, res) => {
    Student.find({})
        .populate('skills')
        .exec((err, student) => {
            if (err) {
                return res.status(500).send("Database Error")
            }
            else {

                Skill.find({}, (err, skill) => {

                    if (err) {
                        return res.status(500).send("Database Error")

                    }
                    else {
                        res.render('students/students', { title: 'students', items: student, skills: skill });

                    }
                })


            }
        })

}






/**
 * Add the Student DataBase
 * @param {*}req
 * @param {*}res
 */
async function addStudent(req, res) {
    try {
        const { name , studentID, studSkillsDrop , major , gpa , level  } = req.body;
        const student = new Student({ name: name , studentId: studentID , major: major, gpa: gpa, level: level, skills: studSkillsDrop});
        await student.save();
        res.redirect('/students') ;
    } 
    catch (err) {
        console.error('Failed to add student', err);
        res.status(500).json({ error: 'Failed to add student' }); }
}



/**
 * Delete the Student DataBase
 * @param {*} req 
 * @param {*} res 
 */
const deleteStudents = (req, res) => {
    Student.findByIdAndDelete(req.params.id)
    .then((params) => {console.log('Student deleted successfully');
  })
    .catch((err) => {
      console.log(err);
    });
  };
  



/**
 * Update the Student DataBase
 * @param {*}req
 * @param {*}res
 */
async function editStudent(req, res) {
    const { editStudID, newStudName, studSkillsDrop, Major, GPA, level ,changeStudentID} = req.body;
    try {
        if (GPA > 4 || GPA < 0) {
            return res.status(400).send({ error: 'Wrong input GPA should be between 4 and 0' })
        }

        
        const student = await Student.findOneAndUpdate(
            { _id: ObjectId(editStudID)},
            { $set: {  name: newStudName ? newStudName : undefined, major: Major, gpa: GPA, level: level, skills: studSkillsDrop  , studentId :changeStudentID ? changeStudentID : undefined } },
            { new: true }
            
            )
            res.redirect('/students') ;
            return res.status(200);


    }
    catch (err) {
        
    return res.status(500).send("Student Id alrady taken");
    }
}



/**
 * return Students filter
 * @param {*}req
 * @param {*}res
 */
const filterStudent = async (req, res) => {
    const id=req.query.positionID;
    if(id){
       
        const findPosition = await Positions.findById(id);
        const skillsP =  findPosition.requiredSkills;
            
            Student.find({skills : {$all : skillsP}})
                .populate('skills')
                .exec((err, student) => {
                    if (err) {
                        return res.status(500).send("Database Error")
                    }
                    else {
        
                        Skill.find({}, (err, skill) => {
        
                            if (err) {
                                return res.status(500).send("Database Error")
        
                            }
                            else {
                              
                                res.render('students/students', { title: 'students', items: student, skills: skill });
        
                            }
                        })
        
        
                    }
                })
            
        
            
            
        }
      
    else {

    const {skills,gpa,level}=req.query;
    

if (skills== undefined && gpa=="" && level =="Choose Level:"){


    Student.find({})
        .populate('skills')
        .exec((err, student) => {
            if (err) {
                return res.status(500).send("Database Error")
            }
            else {

                Skill.find({}, (err, skill) => {

                    if (err) {
                        return res.status(500).send("Database Error")

                    }
                    else {
                       
                        res.render('students/students', { title: 'students', items: student, skills: skill });

                    }
                })


            }
        })
}
else 
{
    const conditionOfFilter = { }
                      
                        if(skills != undefined) {
                            conditionOfFilter.skills=skills
                        }
                        if (gpa != ""){
                                conditionOfFilter.gpa = gpa
                        }
                        if (level != "Choose Level:"){
                                conditionOfFilter.level=level
                        }
    Student.find(conditionOfFilter)
        .populate('skills')
        .exec((err, student) => {
            if (err) {
                return res.status(500).send("Database Error")
            }
            else {

                Skill.find({}, (err, skill) => {

                    if (err) {
                        return res.status(500).send("Database Error")

                    }
                    else {
                      
                        res.render('students/students', { title: 'students', items: student, skills: skill });

                    }
                })


            }
        })
}
}


}
/**
 * search student according to a category and seacrh query
 * @param {*} req has the search query and category 
 * @param {*} res has all the students matching the category and search query
 */
const studentSearch = (req, res) => {
    const { searchQuery, category } = req.query;
    if (category === "skills") {
        Student.find({}) // Find all students
            .populate("skills")
            .exec((err, students) => {
                if (err) {
                    console.log(err);
                } else {
                    // Filter the students to only include those that have a skill matching the search query
                    const filteredStudents = students.filter((student) =>
                        student.skills.some((skill) =>
                            skill.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                    );
                    res.render("students/students", {
                        title: "Students",
                        items: filteredStudents,
                        skills: [],
                    });
                }
            });
    } else {
        Student.find({
            [category]:
                category === "gpa"
                    ? parseFloat(searchQuery)
                    : { $regex: searchQuery, $options: "i" },
        })
            .populate("skills")
            .exec((err, students) => {
                if (err) {
                    console.log(err);
                } else {
                    Skill.find({}, (err, skillList) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render("students/students", {
                                title: "Students",
                                items: students,
                                skills: skillList,
                            });
                        }
                    });
                }
            });
    }
};
  

module.exports = { viewStudents, editStudent, addStudent,filterStudent , deleteStudents, studentSearch}