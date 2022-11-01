const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: TextTrackCue
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Data,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)