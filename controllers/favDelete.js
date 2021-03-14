const handleFavDelete = (req, res, db) => {
  const { placeId, email } = req.body;
  if (!placeId || !email) {
    return res.status(400).json("incorrect form submission");
  }
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
    .catch((e) => {
      res.status(400).json("Delete Favorites Error");
    });
};
module.exports = {
  handleFavDelete: handleFavDelete,
};
