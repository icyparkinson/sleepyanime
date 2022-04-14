const mongoose = require('mongoose')

const AnimeSchema = new mongoose.Schema({
  animeTitle: {
    type: String,
    required: true,
  },
  animeImgUrl: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  selector: {
    type: String,
    required: false,
  },
  animeURL: {
    type: String,
    required: true,
  },
  altTitle: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Anime', AnimeSchema)
