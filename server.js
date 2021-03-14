const express = require("express");
const cors = require("cors");
const knex = require("knex");
const knexPostgis = require("knex-postgis");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/register");
const signin = require("./controllers/signin");

const pry = require("pry");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1234",
    database: "safeplace",
  },
});

const st = knexPostgis(db);
// console.log(db.select("*").from("users"));

const app = express();
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "Guk",
      email: "guk@gmail.com",
      password: "g123",
      favorites: [],
      joined: new Date(),
    },
    {
      id: "124",
      name: "Kim",
      email: "kim@gmail.com",
      password: "k123",
      favorites: [],
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, database, bcrypt)
);

app.post("/signin", (req, res) =>
  signin.handleSignin(req, res, db, database, bcrypt)
);

app.post("/favorites", (req, res) => {
  const { placeId, coordinates, email } = req.body;

  // let found = false;
  // const data = {
  //   placeId: placeId,
  //   coordinates: coordinates,
  // };
  // database.users.forEach((user) => {
  //   user.email === email
  //     ? (user.favorites.push(data), (found = true), res.json(user))
  //     : null;
  // });
  // !found ? res.status(400).json("Favorite Error") : null;
  console.log(coordinates, placeId, email);

  db.insert({
    place_id: placeId,
    email: email,
    lat: coordinates.lat,
    lng: coordinates.lng,
  })
    .into("favorites")
    .then(() => {
      db.select("*")
        .from("favorites")
        .where("email", "=", req.body.email)
        .then((fav) => {
          res.json(fav);
          console.log("fav: ", fav);
        });
      // db("favorites").then((favs) => {
      //   res.json(favs);
      // });
    });

  // db.insert({
  //   placeId: placeId,
  //   email: email,
  //   lat: coordinates.lat,
  //   lng: coordinates.lng,
  // })
  //   .into("favorites")
  //   .then((fav) => {
  //     db("favorites").then((favs) => {
  //       res.json(favs);
  //     });
  //   });
});

app.post("/delete", (req, res) => {
  const { placeId, email } = req.body;
  // let targetUser;
  // let found = false;
  // database.users.forEach((user) => {
  //   if (user.email === email) {
  //     user.favorites.forEach((item, ind) => {
  //       placeId === item.placeId
  //         ? (user.favorites.splice(ind, 1), res.json(user), (found = true))
  //         : null;
  //     });
  //   }
  // });
  // !found ? res.status(400).json("Delete Error") : null;

  db("favorites")
    .where({
      place_id: placeId,
      email: email,
    })
    .delete()
    .then((fav) => {
      db.select("*")
        .from("favorites")
        .where("email", "=", req.body.email)
        .then((favs) => {
          res.json(favs);
        });
    })
    // .then(() => {
    //   res.status(200).json({ status: "delted" });
    // })
    .catch((e) => {
      res.status(400).json("invalid data");
    });
});

app.listen(3030, () => {
  console.log("app is runnign on port 3030");
});

/*
/signIn --> POST -> success/fail
/register --> POST -> user
*/
