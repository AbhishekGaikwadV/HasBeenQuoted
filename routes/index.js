

const express               = require("express"),
      router                = express.Router({mergeParams: true}),  
      Quote                 = require("../models/quotes"),
      middleware            = require("./middlewares")
      
      

  //Home Route//
  router.get( "/", function(req, res){
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
      // if(req.query.search) {
      //       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      //       Quote.find({author: regex}, function(err, author){
      //         if(err){
      //           console.log(err);
      //         } else {
      //           res.render("search",{author: author});
      //         }

      //       });
      // } else {
      Quote.find({}, (err,quotes) => {
      if(err) {
        console.log(err);
      } else {
      res.render("show",{quotes: quotes});
        }
      })
      ;});
    //  });
    
//Intutive page  Route//  
router.get("/intutive",middleware.isLoggedIn, function(req, res){  
    res.render("intutive"); 
});

// function escapeRegex(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// }

module.exports = router;

