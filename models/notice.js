var mongoose   = require('mongoose');

var noticeSchema = new mongoose.Schema({
   notice: String,
   imagen: String,
   date  : String,
   author: {
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: String
}
});


module.exports = mongoose.model("Notice", noticeSchema);
