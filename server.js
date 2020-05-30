const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/api/items");
const app = express();
// const router = require("./routes/api/items");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// here we connect to mongodb database and it need the url as a argument
mongoose.connect(require("./config/keys").mongoURI, (err) => {
  if (err) {
    throw err;
    console.log(err);
  } else {
    console.log("mongodb is connected");
  }
});
var db = mongoose.connection;

app.use("/api/items", items);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("error : ", err);
  } else {
    console.log(`server is started at ${PORT}`);
  }
});
