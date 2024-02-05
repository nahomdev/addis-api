const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "song title is required"],
  },
  artist: {
    type: String,
    required: [true, "song artist is required"],
  },
  album: {
    type: String,
    required: [true, "album is required"],
  },
  genre: {
    type: String,
    required: [true, "genre is required"],
  },
});

const songModel = mongoose.model("Song", songSchema);

module.exports = songModel;
