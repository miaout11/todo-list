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
  },
  userId: {  // 加入 user 與 todo 之間的關聯設定(「去參照 User 的 ObjectId」)
    type: Schema.Types.ObjectId,  // 定義 userId 是一個 ObjectId，也就是它會連向另一個資料物件
    ref: 'User', // 定義參考對象是 User model
    index: true, //  把 userId 設定成「索引」
    // 當我們常常用某個欄位來查找資料時，可以考慮把欄位設成索引，使用索引來查詢資料能夠增加讀取效能。
    required: true // 最後用 required 把這個屬性設為必填，確保每一筆 todo 紀錄都一定會對應到某個 user
  }
})
module.exports = mongoose.model('Todo', todoSchema)
