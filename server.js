require('dotenv').config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const {loginMiddleware} = require('./middleware/loginMiddleware')

//-- Express configuration & Middleware
app.set("view engine", "ejs"); // use EJS
app.use(express.static(path.join(__dirname, '/public'))); 
app.use(express.urlencoded({ extended: true }));
app.use(loginMiddleware);

//-- Express Router Configuration
const usersRoute = require('./routes/usersRoute')
const positionRoute = require('./routes/positionRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const authRoute = require('./routes/authRoute')
const skillsRoute = require('./routes/skillsRoute')
const userProfileRoute = require('./routes/userProfileRoute')
const studentsRoute=require('./routes/studentsRoute')
const page404Route=require('./routes/page404Route')
const filtersRoute = require('./routes/filtersRoute')
const studentAuthRoute = require('./routes/studentAuthRoute')
const landingPageRoute = require('./routes/landingPage');
const requestRoute = require('./routes/requestRout');
const traineesRoute = require('./routes/traineesRoute');



app.use('/admin', authRoute)
app.use('/', landingPageRoute)
app.use('/AboutUs', landingPageRoute)
app.use('/landingSearch', landingPageRoute)
app.use('/landingPos/:id', landingPageRoute)
app.use('/landingPos/:id', landingPageRoute)
app.use('/dashboard', dashboardRoute)
app.use('/position', positionRoute)
app.use('/userProfile', userProfileRoute) 
app.use('/skills', skillsRoute)
app.use('/users', usersRoute)
app.use('/requests', requestRoute)
app.use('/userProfile',userProfileRoute)
app.use('/skills',skillsRoute)
app.use('/students',studentsRoute)
app.use('/filterPage',filtersRoute)
app.use('/studentAuth', studentAuthRoute)
app.use('/requests/:id/:index', requestRoute)
app.use('/requests/decline/:id/:index', requestRoute)
app.use('/trainees', traineesRoute)
app.use('/trainees/:id', traineesRoute)
app.use('/logout',authRoute)
app.use('*',page404Route) 

//  Database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log(`http://localhost:${process.env.PORT}`)
    });
  });