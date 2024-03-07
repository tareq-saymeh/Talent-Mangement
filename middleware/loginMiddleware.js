const express = require('express');
const sessions = require('express-session');
const sessionCookieLifeTime = 1000 * 60 * 60 * 24; // 1d
const cookieParser = require('cookie-parser')
const loginMiddleware = express.Router();

var session;
// Set up session middleware
loginMiddleware.use(sessions({
  secret: "+G2xQz%]/Lk)A8oN*W%xReKj=EcenJ",
  saveUninitialized: true,
  cookie: { maxAge:sessionCookieLifeTime }, 
  resave: false
}));
loginMiddleware.use(cookieParser());

/**
 * Set session after user logged in
 * @param {*} req Get request of session from
 * @param {*} user It's user_id after logged in to put it in session  
 */
//  Because if write it without function it willl be auto generate and can't destroyed it. 
const setSession = (req,user) =>{
    req.session.companyId=user.companyId
    req.session.user_id = user._id.toString();
    session = req.session
}


const sessionUserInfo= (req,res) => {
    return session;
    }

const checkLoggedIn = (req, res, next) => {
    // Check if the user is authenticated or not
    if (req.session.user_id && session) {
        next(); // Proceed to the next route handler
    } else {
        // User is not logged in, redirect to the login page (/Admin)
        console.log('\x1B[31mError:\x1b[0m' , ' Invalid credentials.')
        // Redirect to the login page
        res.redirect('/admin');
    }
}

loginMiddleware.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy()

    // Redirect to the login page after session destroyed
    res.redirect('/admin');
});

module.exports = {
    loginMiddleware,
    checkLoggedIn,
    setSession,
    sessionUserInfo
}

