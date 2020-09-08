
const express               = require("express"),
      router                = express.Router({mergeParams: true}),  
      Quote                 = require("../models/quotes"),
      middleware            = require("./middlewares")
      
      

  //Home Route//
  router.get( "/home", function(req, res){ 
    const que = Math.round(Math.random() * 1601);
    // console.log(que);
    Quote.findOne({num:que}, (err, quotes) => {
        if(err){console.log(err); }
        else{
           
          res.render("index", {quote:quotes.quote,author:quotes.author});
         }     
       });
     });
    
    //Show Route//
    router.get("/show",middleware.isLoggedIn,(req,res) => {
      Quote.find({}, (err,quotes) => {
      if(err) {
        console.log(err);
      } else {
       console.log(req.user); 
      res.render("show",{quotes: quotes});
        }
      });
     });


//Intutive page  Route//  
router.get("/intutive",middleware.isLoggedIn, function(req, res){  
    res.render("intutive"); 
});

module.exports = router;

