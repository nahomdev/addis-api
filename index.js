const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!  Shutting down...");
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

const DB = process.env.MONGODB_URI;
mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 8000;
console.log("port: " + process.env.PORT);
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log(" SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log(" Process terminated!");
  });
});
