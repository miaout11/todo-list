const bcrypt = require('bcryptjs') // 建立user需要新增密碼

// 獨立檔案都需要另外使用.env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Todo = require('../todo') // 載入 todo model
const User = require('../user') // 載入 user model
const db = require('../../config/mongoose') // 取得 db 執行 mongoose.js

const SEED_USER = {
  name: '123',
  password: '12345678',
  email: '123@example.com'
}

// 連線成功後把seeder資料傳送到資料庫
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Todo.create({ name: `name-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})

