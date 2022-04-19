const express = require("express");
const app = express();
const cors = require("cors");
//Routing
const apiRouter = require("./routes/api-router");

const { invalidPath } = require("./controllers/misc-controllers");

const {
  customError,
  psqlError,
  serverError,
} = require("./controllers/error-controllers");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", invalidPath);

app.use(customError);

app.use(psqlError);

app.use(serverError);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});
module.exports = app;
