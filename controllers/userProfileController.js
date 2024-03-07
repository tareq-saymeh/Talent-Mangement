const viewUserProfile = (req,res) => {
    res.render('userProfile/userProfile' , {title:'userProfile'})
}
module.exports = {viewUserProfile}
