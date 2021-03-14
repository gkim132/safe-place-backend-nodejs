const handleFavorites = (req, res, db) => {
  const { placeId, coordinates, email } = req.body;
  if (!placeId || !coordinates || !email) {
    return res.status(400).json("incorrect form submission");
  }
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
        });
    })
    .catch((e) => {
      res.status(400).json("Save Favorites Error");
    });
};
module.exports = {
  handleFavorites: handleFavorites,
};
