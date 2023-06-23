module.exports.home = async function(req, res){
    if(!req.isAuthenticated()){
        // getting to home page.
        return res.redirect('/user/signin');
    }
    return res.render('dashboard', {
        name: req.user.name,
        id: req.user.id
    });

}