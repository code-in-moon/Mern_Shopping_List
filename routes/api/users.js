const express = require("express");
const bcrypt = require("bcryptjs");
// Item model
const User = require("../../models/User");
const router = express.Router();

// @route  POST api/users
// @desc   create a post
// @access  public      without authentication anyone can see
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all field" });
  }
  User.findOne({ email }, (err, user) => {
    if (user) return res.status(400).json({ msg: "Yhe user is already exist" });
    const newUser = new User({ name, email, password });

    //create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save((err, user) => {
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        });
      });
    });
  });

  //   const newUser = req.body;
  //   Users.create(newUser, (err, user) => {
  //     if (err) {
  //       res.status(400).json({ success: false });
  //     } else {
  //       res.status(200).json({ user: user, success: true });
  //     }
  //   });
});

// @route  GET api/users
// @desc   get all users
// @access  public      without authentication anyone can see
router.get("/", (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json(users);
    }
  }).sort({ date: -1 });
});

// @route  GET api/users
// @desc   get a specific users
// @access  public      without authentication anyone can see
router.get("/:_id", (req, res) => {
  const _id = req.params._id;
  User.findById(_id, (err, user) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json(user);
    }
  }).sort({ date: -1 });
});

// @route  GET api/users
// @desc   get a specific users base on email
// @access  public      without authentication anyone can see
router.get("/:email", (req, res) => {
  const user_email = req.params.email;

  User.findOne({ email: user_email }, (err, user) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json(user);
    }
  }).sort({ date: -1 });
});

router.delete("/:_id", (req, res) => {
  const user_id = req.params._id;
  User.findByIdAndRemove(user_id, (err, user) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

module.exports = router;
