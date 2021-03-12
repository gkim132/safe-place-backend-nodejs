const express = require("express");
const cors = require("cors");

const register = require("./controllers/register");
const signin = require("./controllers/signin");

const app = express();
app.use(express.json());
app.use(cors());

const db = {
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
  res.send(db.users);
});

app.post("/signin", (req, res) => {
  let found = false;
  db.users.forEach((user) => {
    if (req.body.email === user.email && req.body.password === user.password) {
      found = true;
      return res.json(user);
    }
  });
  !found ? res.status(400).json("Sign-In Error") : null;
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  db.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    joined: new Date(),
    favorites: [],
  });
  res.json(db.users[db.users.length - 1]);
});

app.post("/favorites", (req, res) => {
  const { placeId, coordinates, email } = req.body;
  let found = false;
  const data = {
    placeId: placeId,
    coordinates: coordinates,
  };
  db.users.forEach((user) => {
    user.email === email
      ? (user.favorites.push(data), (found = true), res.json(user))
      : null;
  });
  !found ? res.status(400).json("Favorite Error") : null;
});

app.post("/delete", (req, res) => {
  const { placeId, email } = req.body;
  let targetUser;
  let found = false;
  db.users.forEach((user) => {
    if (user.email === email) {
      user.favorites.forEach((item, ind) => {
        placeId === item.placeId
          ? (user.favorites.splice(ind, 1), res.json(user), (found = true))
          : null;
      });
    }
  });
  !found ? res.status(400).json("Delete Error") : null;
});

app.listen(3030, () => {
  console.log("app is runnign on port 3030");
});

/*
/signIn --> POST -> success/fail
/register --> POST -> user
*/
