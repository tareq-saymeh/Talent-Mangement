/**
 * get side bar
 * @param {*}req
 * @param {*}res
 */
const sidebarController=(req,res)=>{
    res.render('sidebar' , {title:'sidebar'})
}
 module.exports=sidebarController;