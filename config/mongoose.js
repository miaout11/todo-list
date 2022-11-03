const mongoose = require('mongoose') // 載入 mongoose

const MONGODB_URI = process.env.MONGODB_URI

// 設定連線到 mongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db // 匯出資料庫連線狀態 db
