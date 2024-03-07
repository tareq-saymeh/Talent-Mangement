const Student = require('../models/Students');
const Skill = require('../models/Skill');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validator = require('validator');

const studentAuthController = async (req, res) => {
    const skillReq = await Skill.find({});
    res.render('studentAuth/studentAuth', { 'title': 'studentAuth', 'skills': skillReq })
}

/**
 * Student Registration by getting Email, Name, Student ID, Major, GPA, Level, Skills, Password
 *Check if the inputs is valid or not 
 * @param {*} req
 * @param {*} res 
 */
const signUp = async (req, res) => {
    const { signupEmail, signupStudentId, signupStudentGpa, signupRePassword, signupPassword, signupName, levelAuth, major, skills } = req.body;

    if (validator.isEmail(signupEmail)) {
        return res.status(501);
    }
    if (signupPassword.length < 8 || signupPassword.length > 25) { return res.status(401).send({ 'error': 'Error: Password must be longer that 8 chars and less than 25' }); }
    else {
        const emailUsed = await Student.findOne({ email: signupEmail });
        if (emailUsed) {

            console.log(emailUsed);
            return res.status(501).send('Error: Email alrady Used.');
        }
        else if (signupName.length > 30 || signupName < 3) {

            return res.status(500).send('Error: Name must be longer that 3 chars and less than 30');
        }
        else {

            if (signupStudentId > 12300000 || signupStudentId < 11600000) {
                return res.status(500).send('Error: Invailed ID ');
            }
            else if (skills === undefined) {

                return res.status(400).send('Bad input skills')
            }
            else if (signupStudentGpa > 4 || signupStudentGpa < 0) {

                return res.status(500).send('Error: Invailed GPA ');
            }
            else if (levelAuth == "Choose Level:") {

                return res.status(500).send('Error: Invailed Level ');
            } else if (!(signupRePassword === signupPassword)) {
                return res.status(401).send('Error: Passwords not match ');
            }
            else {

                const IDUsed = await Student.findOne({ studentId: signupStudentId });
                if (IDUsed) {
                    return res.status(500).send('Error: ID alrady Used.');
                }
                else {

                    bcrypt.hash(signupPassword, saltRounds, function (err, hash) {
                        const newStudent = new Student({ email: signupEmail, name: signupName, studentId: signupStudentId, gpa: signupStudentGpa, passwordHash: hash, level: levelAuth, major: major, skills: skills });
                        newStudent.save();
                        res.redirect('/studentAuth');
                    });
                }
            }
        }
    }
}
/**
 * Check if the Student logged in with the correct email, password or not 
 * Compare the email with the student in the database.
 * @param {*} req
 * @param {*} res 
 */
const signIn = async (req, res) => {
    const { signinPassword, signinEmail } = req.body;
    if (validator.isEmail(signinEmail) === 0) {
        return res.status(501).send('Error: Invalid email or password.');
    }
    else {
        const email = await Student.findOne({ email: signinEmail });
        if (email) {
            bcrypt.compare(signinPassword, email.passwordHash, function (err, result) {
                if (result) {
                    return res.redirect('/');
                }
                else {
                    return res.status(401).send('Error: Invalid Password.');
                }
            });
        }
        else {
            const skillReq = await Skill.find({});
            res.render('studentAuth/studentAuth', { 'title': 'studentAuth', 'skills': skillReq })
        }
    }
}
module.exports = { studentAuthController, signUp, signIn }
