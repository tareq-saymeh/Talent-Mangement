const express = require('express');
const router = express.Router();
const User =require('../models/User')
const {session}=require('../middleware/loginMiddleware');


router.get('/', async(req, res) => {
  const userId=req.session.user_id 
  const userData =await User.findOne({_id:userId })
  if (userData ){
    res.render('userProfile' , {title:'userProfile',userData})}
  else 
  res.redirect('admin');
});

router.post('/',(req,res)=>{
  let email=session.user_id 
  let user=User.findOne({email})
  let pass=req.body.CurrentPassword
  let FN=user.firstName
  let LN=user.lastName
  if(user){
  if(req.body.CurrentPassword===user.password){
    if(req.body.NewPassword===req.body.CoPassword)
    {
      pass=req.body.NewPassword
    }
  }
if(req.body.firstName=='');
else{FN=req.body.firstName}
if(req.body.lastName=='');
else{LN=req.body.lastName}
}
  const updatedUser={
    firstName:FN,
    lastName:LN,
    email:req.body.UserEmail,
    password:pass
  }
  User.updateOne({email:email},{$set:updatedUser},(error,doc)=>{
    if(error){
    console.log(error)
    res.redirect('/');
    return;
    }
    console.log(doc)
  res.redirect('/userProfile')
  })
})


module.exports = router;