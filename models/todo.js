const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  isDone: { // 在這裡我們將屬性取名為 isDone，通常變數名稱用is，暗示著這個變數的型別為布林值
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('Todo', todoSchema)
