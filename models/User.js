const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

// model (model/item) is like collection and the "item" below is the name of it
//the name of document in mongodb would be items (it automatically add s)
module.exports = User = mongoose.model("user", UserSchema);
