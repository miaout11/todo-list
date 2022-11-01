const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // 取得當下時間戳記(使用者註冊的當下時間)
  }
})

module.exports = mongoose.model('User', userSchema)