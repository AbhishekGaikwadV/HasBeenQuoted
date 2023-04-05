const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      axios                 = require("axios"),
      mongoose              = require("mongoose"),
      User                  = require("./models/users"),
      Quote                 = require("./models/quotes"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      index                 = require("./routes/index"),
      usersession           = require("./routes/usersession"),
      ajaxserver            = require("./routes/ajaxserver"),
      middlewares           = require("./routes/middlewares"),
      path                  = require("path"),
      cors                  = require('cors')

          
      

//For mongoose deprication handling
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);  
      
//Database connection      
mongoose.connect("mongodb+srv://HBQAdmin:12345@cluster0.xgorc.mongodb.net/quotesv1?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

//Passport Configutation
app.use(require("express-session")({
    secret: "love moves the world - Be the Creator of your own destiny",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Body parser, local directory,EJS 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//User variable middleware//
app.use(function(req, res, next){
    res.locals.currentuser = req.user;
    next();
   });
   
//Routes use decleration
app.use(index);
app.use(usersession);
app.use(ajaxserver);

//CORS Header 
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Request-With,Content-Type,Accept");
    next();
});


  
 //Server setup//   
 app.listen( process.env.PORT || 3000, () => {
 console.log("The HasQuoted Server Has Started!");
});





