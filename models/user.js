var mongoose   = require('mongoose');
var passportLocalMongoose  = require('passport-local-mongoose');


var userSchema = new mongoose.Schema({
   nameu: String,
   username: String,
   departmentu: String,
   yearu: Number,
   phonenumberu: Number,
   dobu: Number,
   password: String,
   idcardu: Number,
   rollnou: Number,
   imageu: String
});


userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
