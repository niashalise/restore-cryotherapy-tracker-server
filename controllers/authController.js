// const users = require("../data/storeInventory")
const passport = require("passport");
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const signup = async (req, res, next) => {
  console.log("Req.body: ", req.body);
  const { storeName, email, password } = req.body;

  if (!storeName || !email || !password) {
    return res.status(400).json({
      error: { message: "Missing required fields." },
      statusCode: 400
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User ({
      storeName: storeName,
      tenantId: req.tenant._id,
      email: email,
      password: hashedPassword,
      googleId: ""
    });
    
    await newUser.save();
    newUser.password = undefined;

    const payload = { tenantId: req.tenant._id, userId: newUser._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).json({
      success: { message: "User is created." },
      data: { user: newUser, token },
      statusCode: 201,
    });
  } catch (error) {
    return next(error)
  }
};

const localLogin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        error: { message: "There is not a user detected. Please try again." }
      })
    }

    const userCopy = { ...user._doc };
    userCopy.password = undefined;

    //data claims encoded inside the token
    const payload = {tenantId: req.tenant._id, userId: user._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d"}); 

    res.status(200).json({
      success: {
        message: "Login successful within local authentication feature.",
      },
      data: { user: userCopy, token }, //replaces login via a cookie with a token instead
      statusCode: 200,
    });
  }) (req, res, next)
};

const logout = async (req, res, next) => {
    return res.status(200).json({
      success: { message: "User logged out." },
      statusCode: 200
    })

};

module.exports = { signup, localLogin, logout };