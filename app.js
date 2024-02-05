const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/app_error");
const GlobalErrorHandler = require("./controllers/error_controller");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/api/v1/test", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "addis api is working...",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
