const catchAsync = require("./../utils/catch_async");

const {
  getAll,
  getOne,
  update,
  create,
  delete: deleteOne,
} = require("./crud_factory");
const Song = require("../models/song");

exports.getAllSongs = getAll(Song);
exports.getSong = getOne(Song);
exports.createSong = create(Song);
exports.updateSong = update(Song);
exports.deleteSong = deleteOne(Song);

exports.getStat = catchAsync(async (req, res, next) => {
  const stat = Song.aggregate([
    {
      $match: {
        ...req.query,
      },
    },
    {
      $facet: {
        songs: [
          {
            $count: "title",
          },
        ],
        album: [
          {
            $count: "album",
          },
        ],
        genre: [
          {
            $count: "genre",
          },
        ],
      },
    },
  ]);
  let data = await stat.exec();

  data = {
    songs: data[0].songs[0].title,
    album: data[0].album[0].album,
    genre: data[0].genre[0].genre,
  };
  console.log("data", data);
  res.status(200).json({
    status: "success",
    message: data,
  });
});
