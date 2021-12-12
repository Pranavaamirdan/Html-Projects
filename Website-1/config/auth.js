module.exports = {
    ensureAuthenticated: function(req,res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', '❌ Please Login to view this resource');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
          return next();
        }
        res.redirect('/dashboard');      
      }
}