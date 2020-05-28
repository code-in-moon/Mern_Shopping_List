const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// model (model/item) is like collection and the "item" below is the name of it

module.exports = Item = mongoose.model("item", ItemSchema);
