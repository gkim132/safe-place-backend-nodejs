const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const favorites = require("./controllers/favorites");
const favDelete = require("./controllers/favDelete");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post("/favorites", (req, res) => favorites.handleFavorites(req, res, db));

app.post("/delete", (req, res) => favDelete.handleFavDelete(req, res, db));

app.listen(process.env.PORT || 3030, () => {
  console.log(`app is runnign on port ${process.env.PORT}`);
});
