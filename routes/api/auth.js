const express = require("express");
const bcrypt = require("bcryptjs");
// Item model
const User = require("../../models/User");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @route  POST api/auth
// @desc   authentication a user
// @access  public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all field" });
  }

  //check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "The user does not exist" });

    //validate passwords
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credetials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        //below means the token will be expire in 3600 second
        { expiresIn: 3600 },
        (err, token) => {
          if (err) console.log(err);

          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

//here we constantly autorize user with token
// @route  POST api/auth/user
// @desc   get user data
// @access  private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
