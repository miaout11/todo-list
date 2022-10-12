// home模組 放與首頁相關的路由
const express = require('express') // 載入express
const router = express.Router() // 載入express router
const Todo = require('../../models/todo') // 引用 Todo model

// 定義首頁路由
router.get('/', (req, res) => {
    Todo.find()  // 叫Todo model去資料庫查找出資料
        // 撈資料以後想用 res.render()，要先用 .lean() 來處理
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort({ _id: 'asc' }) // 根據 _id 升冪排序 desc則是降冪排序
        .then(todos => res.render('index', { todos })) // 將資料傳給 index(前端) 樣板
        .catch(error => console.error(error)) // 如果發生意外，執行錯誤處理
})

module.exports = router // 匯出router模組