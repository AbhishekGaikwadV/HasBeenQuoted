const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      passport      = require("passport"),
      User          = require("../models/users"),
      middleware    = require("./middlewares"),
      cors          = require('cors')   
      
      
      
    //CORS permissions
      var corsOptions  = {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    };
      



//Login Routes//
router.get("/login",cors(corsOptions), function(req, res){
    res.render("login");
  });

  router.post("/login",cors(corsOptions),passport.authenticate("local",{
    successRedirect:"/show",
    failureRedirect:"/login"
  }));

  //Logout Route//
  router.get("/logout",cors(corsOptions), function(req, res){
   req.logout();
   res.redirect("/");
  });

  
  //SignUp Routes//
  router.get("/signup",cors(corsOptions), function(req, res){
    res.render("signup");
  });

  router.post("/signup",cors(corsOptions), function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err){
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