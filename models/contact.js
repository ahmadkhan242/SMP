var mongoose   = require('mongoose');

var contactSchema = new mongoose.Schema({
   name: String,
   college: String,
   email: String,
   phonenumber: Number,
   comment: String
});


module.exports = mongoose.model("Contact", contactSchema);
