const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const app = express();
app.use(express.urlencoded({ extended: true }));
var jwt = require("jsonwebtoken");

const secret = process.env.AUTH_SECRET;

router.route("/signup").post(async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    console.log("email", email);
    const newUser = new user({ email, firstname, lastname, password });
    await newUser
      .save()
      .then((savedUser) => {
        console.log("going forward");
        res.status(201).json({ success: true, message: "User Created" });
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.code == 11000);
        if (err.code == 11000) {
          res
            .status(422)
            .json({ success: false, message: "User already exists" });
          return;
        } else {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
          return;
        }
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email , password", email, password);
    const foundUser = await user.find({ email: email });
    if (foundUser.length !== 0) {
      console.log("The found user is", foundUser);
      console.log("founduser.password", foundUser[0].password);
      console.log("the email of founduser is", foundUser[0].email);
      const { lastname, firstname } = foundUser[0];
      console.log("last name is", lastname);
      console.log("fistname is", firstname);
      if (password === foundUser[0].password) {
        const token = jwt.sign(
          {
            userId: foundUser[0].email,
          },
          secret,
          { expiresIn: "1h" }
        );
        res.status(201).json({ email, token, firstname, lastname });
      } else {
        res.status(401).json({ message: "password entered is wrong" });
      }
    } else {
      res.status(404).json({ message: "email entered not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.route("/allusers").get(async (req, res) => {
  try {
    const allUsers = await user.find();
    console.log("all users", allUsers);
    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.route("/follow").post(async (req, res) => {
  try {
    console.log("in follow fn");
    const { email, useremail } = req.body;
    console.log("the user and email is ", useremail, email);
    const currentUser = await user.findOne({ email: useremail });
    console.log("the current user", currentUser);
    currentUser.following.push(email);
    await currentUser.save();
    console.log("the current user 2", currentUser);
    const allUsers = await user.find();
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log("error in post", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
