
const express               = require("express"),
      router                = express.Router({mergeParams: true}),
      middleware            = require("./middlewares"),
      Quote                 = require("../models/quotes")
    

//Ajax for pagination on Show Route//
router.get('/ajax',middleware.paginatedData(Quote), (req, res) =>{
    // console.log(res.paginatedResults);
    res.json(res.paginatedResults);
    
});

//Intutive microapp Ajax //
router.get("/microapp", function(req, res){  
  const que = Math.round(Math.random() * 1601);
  
  Quote.findOne({num:que}, (err, quotes) => {
      if(err){console.log(err); }
      else{
       res.json(quotes); 
      }     
    });
  });

  module.exports = router;