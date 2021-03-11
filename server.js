const express = require("express");

const register = require("./controllers/register");
const signin = require("./controllers/signin");

const app = express();

app.listen(6000, () => {
  console.log("app is runnign on port 6000");
});
