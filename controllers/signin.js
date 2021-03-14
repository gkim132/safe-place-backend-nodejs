const handleSignin = (req, res, db, database, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  // let found = false;
  // database.users.forEach((user) => {
  //   if (req.body.email === user.email && req.body.password === user.password) {
  //     found = true;
  //     console.log(user);
  //     return res.json(user);
  //   }
  // });
  // !found ? res.status(400).json("Sign-In Error") : null;

  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        console.log(req.body.email);
        db.select("*")
          .from("favorites")
          .where("email", "=", req.body.email)
          .then((user) => {
            console.log(user);
            console.log(!user.length);
            if (!user.length) {
              console.log("adsf");
              res.json({
                id: "",
                name: "",
                email: email,
                joined: "",
                favorites: [],
              });
            } else {
              res.json({
                id: "",
                name: "",
                email: email,
                joined: "",
                favorites: user,
              });
            }
          });
        // db.select("*")
        //   .from("users")
        //   .where("email", "=", req.body.email)
        //   .then((user) => {
        //     console.log(user);
        //     res.json(user[0]);
        //   })
        //   .catch((err) => res.status(400).json("Signning Error"));
      } else {
        res.status(400).json("Wrong Credentials");
      }
    })
    .catch((err) => res.status(400).json("Wrong Credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
