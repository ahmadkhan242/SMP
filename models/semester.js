var mongoose   = require('mongoose');

var semSchema = new mongoose.Schema({
  semester: Number
});


module.exports = mongoose.model("Semester", semSchema);
