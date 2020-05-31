const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/api/items");
const app = express();
const path = require("path");
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

//set up for deploy a full stack app
//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("error : ", err);
  } else {
    console.log(`server is started at ${PORT}`);
  }
});
