const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res, next) => {
  res.status(200).json({
    success: { message: "This page points to the home page." },
    statusCode: 200,
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(
    `Restore Cryotherapy Tracker server is listening on port http://localhost:${PORT}.`
  ); // http://localhost:8080
});
