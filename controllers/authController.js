const UserModel = require('../models/User');
const {setSession}= require('../middleware/loginMiddleware')
const validator = require('validator');

/**
 * Render login page (/admin) for "GET Method"
 */
const getLoginPage = (req, res)=> {
  res.render('../views/auth/login.ejs' , {title:'Admin'})
}

/**
 * Check if the user logged in correctly or not by getting email address, password 
 * and check if entered email is valid or not from body 
 * and compare it with the user in the database.
 * @param {*} req Send request to set session for user and send session details to loginMiddleware
 * @param {*} res 
 */
const checkValid = async (req, res)=> {
  const { email, password } = req.body;

  try {
    // Check if email is valid or not.
    if (validator.isEmail(email) === false) {
        return res.status(400).render('../views/auth/login.ejs', { 'error': 'Error: Invalid email' });
    }
    // Find the user by email address
    const User = await UserModel.findOne({ email ,password});

    // Check if user exists in DB 
    if (!User) {
      return res.status(400).render('../views/auth/login.ejs', { error: 'User not exists or email not correct' });
    }

    // // Check if password matches
    if (User.password !== password) {
      return res.status(400).render('../views/auth/login.ejs', { error: 'Invalid Password' });
    }

    // Set session variable
    console.log('\x1b[32mMessage:\x1b[0m Successfully Login');
    console.log('\x1b[34mUser Inside Session:\x1b[0m ' + User.email);
    setSession(req, User);

    // Redirect to dashboard after successful login.
    res.redirect('/dashboard');
  } 
  catch (error) {
    console.error(error);
    res.status(500).render('../views/auth/login.ejs', { error: 'Internal Server Error' });
  }
}

module.exports = {
  getLoginPage,
  checkValid
};
