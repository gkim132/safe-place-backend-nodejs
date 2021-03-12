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
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json(db.users[0]);
  } else {
    res.status(400).json("Error");
  }
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
  let targetUser;
  db.users.forEach((user) => {
    const data = {
      placeId: placeId,
      coordinates: coordinates,
    };
    user.email === email
      ? (user.favorites.push(data), (targetUser = user))
      : console.log("Error Save");
  });
  res.json(targetUser);
});

app.listen(3030, () => {
  console.log("app is runnign on port 3030");
});

/*
/signIn --> POST -> success/fail
/register --> POST -> user
*/
