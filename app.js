var express         = require('express'),
    app             =  express(),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    request         = require('request'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose')
var data            = require('./data');

var Contact         = require("./models/contact");
var Department      = require("./models/department");
var Semester        = require("./models/semester");
var User            = require("./models/user");
var Notice            = require("./models/notice");

var detailRoutes    = require("./routes/detail");

mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://<ahmad242>:<ahmad242>@ds261969.mlab.com:61969/smp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(require("express-session")({
  secret: "Once upon a time",
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this code is for using the user data to show something after login
app.use(function(req, res, next){
  res.locals.userU = req.user;
  next();
});
//===============================
//routes
//===============================
app.get("/", function(req, res){
  Notice.find({},function(err, allNotice){
    if(err){
      console.log(err);
    } else {
        res.render('notice_board',{notices:allNotice});
    }
  });
});
app.get("/new_notice",isLoggedIn, function(req, res){
  res.render('new_notice');
});
app.post("/",isLoggedIn, function(req, res){
  var notice = req.body.notice;
  var imagen = req.body.imagen;
  var author ={
    id: req.user._id,
    username: req.user.username
  };
  var date =req.body.date ;
  var newNotice = {notice:notice, imagen:imagen,author:author,date:date};
  Notice.create(newNotice, function(err, newlyNotice){
    if(err){
      console.log(err);
    }else {
      // console.log(newlyNotice);
      res.redirect('/');
    }
  });
});

app.delete("/",isLoggedIn,function(req, res){
  Notice.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/");
    }else {
        res.redirect("/");
    }
  });
});
//===============================
//  FOR DETAIL PAGE
//===============================
app.get("/detail",isLoggedIn, function(req, res){
  res.render('detail');
});

app.post("/detail/student",isLoggedIn, function(req, res){
  Department.find({},function(err, allDepartment){
    if(err){
      console.log(err);
    } else {
      Semester.find({},function(err, allSemester){
        if(err){
          console.log(err);
        } else {
          res.render('student',{departments:allDepartment,semesters:allSemester});
        }
      });
    }
  });
});

app.post("/detail/teacher",isLoggedIn, function(req, res){
  Department.find({},function(err, allDepartment){
    if(err){
      console.log(err);
    } else {
        res.render('teacher',{departments:allDepartment});
    }
  });
});
//===============================
// FOR ATTENDANCE
//===============================
app.get("/attendance",isLoggedIn, function(req, res){
  res.render('attendance');
});
app.post("/attendance",isLoggedIn, function(req, res){
  res.render('list');
});


app.get("/notifications", function(req, res){
  res.render('notifications');
});
//===============================
// for results routes
//===============================
app.get("/result", isLoggedIn,function(req, res){
  res.render('result');
});

//===============================
// for contact routs
//===============================
app.get("/contact", function(req, res){
  res.render('contact');
});

app.post("/", function(req, res){
  var name = req.body.name;
  var college = req.body.college;
  var email = req.body.email;
  var phonenumber = req.body.phonenumber;
  var comment = req.body.comment;
  var newContact = {name:name,college:college,email:email,phonenumber:phonenumber,comment:comment};
  Contact.create(newContact,function(err, newlyContact){
    if(err){
      console.log(err);
    }else {
      console.log(req.body);
      res.redirect("/");
    }

  })
});
app.get("/account", function(req, res){
  res.render('account');
})
//===============================
// FOR SIGNUP
//===============================
app.get("/register", function(req, res){
  res.render('signup');
});

app.post("/register", function(req, res){
  var username = req.body.username;
  var nameU = req.body.nameu;
  var departmentU = req.body.departmentu;
  var yearU = req.body.yearu;
  var phonenumberU = req.body.phonenumberu;
  // var passwordU = req.body.passwordU;
  var dobU = req.body.dobu;
  var idcardU = req.body.idcardu;
  var rollnoU = req.body.rollnou;
  var imageU = req.body.imageu;
  var newUser = {nameu:nameU,username:username,departmentu:departmentU,yearu:yearU,phonenumberu:phonenumberU,dobu:dobU,idcardu:idcardU,rollnou:rollnoU,imageu:imageU};
  User.register(newUser,req.body.password,function(err, newlyUser){
    if(err){
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    })
  })
});


app.get("/account/edit", function(req, res){
  res.render("edit");
});


app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", passport.authenticate("local",
{
   successRedirect: "/",
   failureRedirect: "/login"
}), function(req , res ){
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};
app.listen(process.env.DATABASEURL, function(){
  console.log("your server is on from port DATABASEURL");
});
