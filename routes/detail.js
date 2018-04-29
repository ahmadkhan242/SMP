// var express = require('express'),
//     app  = express();
// var mongoose   = require('mongoose');
// var    Contact        = require("../models/contact.js");
// var    Department      = require("../models/department");
// var    Semester     = require("../models/semester");
// var    User      = require("../models/user");
//
//     //  FOR DETAIL PAGE
//     app.get("/detail", function(req, res){
//       res.render('/detail');
//     });
//
//     app.post("/detail/student", function(req, res){
//       Department.find({},function(err, allDepartment){
//         if(err){
//           console.log(err);
//         } else {
//           Semester.find({},function(err, allSemester){
//             if(err){
//               console.log(err);
//             } else {
//               res.render('/student',{departments:allDepartment,semesters:allSemester});
//             }
//           });
//         }
//       });
//     });
//
//     app.post("/detail/teacher", function(req, res){
//       res.render('teacher');
//     });
