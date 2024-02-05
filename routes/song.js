const express = require("express");
const {
  getAllSongs,
  createSong,
  getSong,
  deleteSong,
  updateSong,
  getStat,
} = require("../controllers/song");

const router = express.Router();

router.route("/").get(getAllSongs).post(createSong);
router.route("/count").get(getStat);

router.route("/:id").get(getSong).delete(deleteSong).patch(updateSong);

module.exports = router;
