// var mongoose = require('mongoose');
//
// var  Detail      = require("./models/detail");
//
// var departmentData = [
//   {name:"Computer Science"},
//   {name:"Electronics and communication"},
//   {name:"Machenical"},
//   {name:"Civil"},
//   {name:"Electrical"}
// ]
//
// var semesterData = [
//   {semester: "1"},
//   {semester:"2"},
//   {semester: "3"},
//   {semester: "4"},
//   {semester: "5"},
//   {semester: "6"},
//   {semester: "7"},
//   {semester: "8"}
// ]
// Detail.remove({}, function(err){
//   if(err){
//     console.log(err);
//   }
//   console.log("removed details! ");
// });
//   // // To added all streams in the database
//   // departmentData.forEach(function(data){
//   //   Detail.create( data, function(err, department){
//   //     if(err){
//   //       console.log(err);
//   //     }else {
//   //       console.log("Added the department data");
//   //       department.save();
//   //     }
//   //   });
//   // });
//   //
//   //
//   // // To added all semester in the database
//   // semesterData.forEach(function(semdata){
//   //   Detail.create( semdata, function(err, semester){
//   //     if(err){
//   //       console.log(err);
//   //     }else {
//   //       console.log("Added the se data");
//   //       semester.save();
//   //     }
//   //   });
//   // });
