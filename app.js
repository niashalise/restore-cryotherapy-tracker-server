require("dotenv").config(); 
require("./config/connection");
require("./config/authStrategy");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("node:path");

const session = require("express-session");
const passport = require("passport");

const authRoutes = require("./routes/authRouter");
const sessionRoutes = require("./routes/sessionsRouter");
const contactRoutes = require("./routes/contactRouter");

const app = express();
const PORT = process.env.PORT || "8080";

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET_KEY,

        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes); 
app.use("/api/sessions", sessionRoutes); 
app.use("/api/inquiry", contactRoutes); 

app.use((err, req, res, next) => {
  const authErrStatus = err.status || 400;
  const serverErrStatus = err.status || 500;

  let condition = err.code === 11000;

  if (condition) {
    return res.status(authErrStatus).json({
      error: { message: "Error detected!" },
      statusCode: authErrStatus,
    });
  } else {
    console.log("We passed the error handling middleware, you're good to go/");
  }

  return res.status(serverErrStatus).json({
    error: { message: err.message || "Internal server error, oh no!" },
    statusCode: serverErrStatus,
  });
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: { message: "This page points to the home page." },
    statusCode: 200,
  });
});

app.listen(PORT, () => {
  console.log(
    `Restore Cryotherapy Tracker server is listening on port http://localhost:${PORT}.`
  );
});
