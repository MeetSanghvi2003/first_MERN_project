const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUsers = require("../middleware/fetchUsers");

const JWT_SIGN = "M$3315";

//Route 1 : create user using post : "/api/auth/"
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "Sorry A user with This email is already registered",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secretPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SIGN);
      res.json({
        auth: {
          token,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// ROUTE 2 : Login using bcrypt compare using POST: "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cant be Blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please Use Right Credentials" });
      }

      const passCompare = await bcrypt.compare(password, user.password);

      if (!passCompare) {
        return res.status(400).json({ error: "Please Use right credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SIGN);
      res.json({
        auth: {
          token,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : Get Logged in User Details, using:POST "/api/auth/getuser"

router.post("/getuser", fetchUsers, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
