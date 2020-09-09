const express = require("express");

//Middlewares//   
   
//Middleware Object//   
var middlewareObj = {};

//isLogged in check middleware//
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
        }
      res.redirect("/login");
    }


 //Pagination middleware(Special Thanks to Web Dev simplified)   
    middlewareObj.paginatedData = function(model){
        return async (req, res, next) => {
          try {
          const page = parseInt(req.query.page);
          const limit = parseInt(req.query.limit);
          const startIndex = (page - 1) * limit;
          const endIndex = page* limit;
          const results = {};
          
          if(startIndex > 0){
          results.previous = {
            page: page - 1,
            limit: limit 
                  }
                }
          if (endIndex <= await model.countDocuments().exec()){
              results.next = {
                page: page+1,
                limit: limit
              }
            } 
      
          
      
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
      
           } catch(e) {
              res.status(500).json({message: e.message });
             }  
          }
        
        }
          
          
  
    module.exports = middlewareObj;
