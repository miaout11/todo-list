// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Todo = require('./models/todo') // 載入 Todo model

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

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
// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
// setting body-parser
// 只有使用者的請求先經過body-parser的解讀後，我們才能在req.body中取得表單傳送過來的資料。
app.use(express.urlencoded({ extended: true }))

// setting all todo's route
app.get('/', (req, res) => {
  Todo.find() // 叫Todo model去資料庫查找出資料
  // 撈資料以後想用 res.render()，要先用 .lean() 來處理
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos: todos })) // 將資料傳給 index(前端) 樣板
    .catch(error => console.error(error)) // 如果發生意外，執行錯誤處理
})
// setting create's route
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
// setting create todo route
app.post('/todos', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name }) // call Todo 直接新增資料
  .then(() => res.redirect('/') )
  .catch(error => console.error(error))
})
// setting detail route
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error(error)) 
}) 

// setting port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})