//To render home page.
module.exports.home=function(req,res){
    return res.render('home',{
        title:'Habit Tracker'
    });
}