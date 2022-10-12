const Todo = require('../todo') // 載入 todo model
const db = require('../../config/mongoose') // 取得 db 執行 mongoose.js

// 連線成功後把seeder資料傳送到資料庫
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
   Todo.create({name:`name-${i}`}) 
  }
  console.log('done.')
})