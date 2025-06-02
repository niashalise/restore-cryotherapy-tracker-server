// const users = require("../data/storeInventory")
const passport = require("passport");
const bcrypt = require("bcrypt")
const User = require("../models/userModel");


const signup = async (req, res, next) => {
  //firstName, lastName, username, password <-- req.body
  const { storeName, email, password } = req.body;

  if (error) {
    return next(error);
  } else if (!storeName || !email || !password) {
    return res.status(400).json({
      error: { message: "Missing required fields." },
      statusCode: 400
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      storeName: storeName,
      email: email,
      password: hashedPassword,
      googleId: ""
    };
    
    await newUser.save();

    req.login(newUser, (error) => {
      if (error) {
        return next(error);
      }
    })

    newUser.password = undefined;

    return res.status(201).json({
      success: { message: "User is created." },
      data: { newUser },
      statusCode: 201,
    });
  } catch (error) {
    return next(error)
  }
};

const login = async (req, res, next) => {
  res.status(200).json({
    success: { message: "Login was successful." },
  });
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

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      const userCopy = { ...req.user._doc };
      userCopy.password = undefined;

      res.status(200).json({
        success: { message: "Login successful within local authentication feature." },
        data: { user: userCopy },
        statusCode: 200
      });
    })
  })
};

const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
    })

    res.clearCookie("connect.sid");
    return res.status(200).json({
      success: { message: "User logged out." },
      statusCode: 200
    })
  })
};

module.exports = { signup, login, localLogin, logout };