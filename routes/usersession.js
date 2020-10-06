const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      passport      = require("passport"),
      User          = require("../models/users")
      
      



//Login Routes//
router.get("/login", function(req, res){
    res.render("login");
  });

  router.post("/login",passport.authenticate("local",{
    successRedirect:"/show",
    failureRedirect:"/login"
  }), function(req, res){
  });

  //Logout Route//
  router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
  });

  
  //SignUp Routes//
  router.get("/signup", function(req, res){
    res.render("signup");
  });

  router.post("/signup", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
        console.log(err);
        return res.render('signup');
      } else{
        passport.authenticate("local")(req, res, function(){
            res.redirect("show");
        });
      }
    });    
  });


  module.exports = router;
