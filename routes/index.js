const express = require('express') // 載入express
const router = express.Router() // 載入express router
const home = require('./modules/home') // 引入 home 模組程式碼
const todos = require('./modules/todos') // 引入 todos 模組程式碼
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') // 掛載 middleware


// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組
router.use('/todos', authenticator, todos) // 加入驗證程序
router.use('/users', users) //總路由器引用 users 模組
// 將網址結構符合 / 字串的 request 導向 home 模組
// 定義寬鬆的路由('/')要引到清單最下方，避免攔截到其他的路由。
router.use('/', authenticator, home) // 加入驗證程序

module.exports = router // 匯出router模組
