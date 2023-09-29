// render home page
module.exports.home = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/reviews');
    }
    return res.render("home", {
        title: "Employee Review System",
    });
};
