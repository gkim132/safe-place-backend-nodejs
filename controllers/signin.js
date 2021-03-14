const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

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
      } else {
        res.status(400).json("Wrong Credentials");
      }
    })
    .catch((err) => res.status(400).json("Wrong Credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
