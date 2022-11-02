const express = require('express') // 載入 express 並建構應用程式伺服器
const session = require('express-session') // 載入 express-session
const exphbs = require('express-handlebars') // 載入handlebars
const methodOverride = require('method-override') // 載入 method-override

const routes = require('./routes') // 引入路由器時路徑設定為 /routes 會自動尋找目錄下叫 index 的檔案

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
// setting port
// 如果在 Heroku 環境則使用 process.env.PORT，否則為本地環境，使用 3000
const PORT = process.env.PORT || 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// use express-session
app.use(session({
  secret: 'ThisIsMySecret', //驗證 session id 的字串，不會洩漏給用戶端，這裡用'ThisIsMySecret'，但可以隨機輸入一個字串(如:'MySecret')
  resave: false, //設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡，所以我們設定false。
  saveUninitialized: true //強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
}))

// 設定載入靜態檔案
app.use(express.static('public'))

// setting body-parser // express已經有內建body-parser
// 只有使用者的請求先經過body-parser的解讀後，我們才能在req.body中取得表單傳送過來的資料。
app.use(express.urlencoded({ extended: true }))

// use method-override
app.use(methodOverride('_method'))

// 呼叫 passport function 以使用passport
usePassport(app)

app.use((req, res, next) => {
  // console.log(req.user)
  // res.locals 是 Express.js 幫我們開的一條捷徑，放在 res.locals 裡的資料，所有的 view 都可以存取。
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes) // 重構路由器，將 request 導入路由器

// 設定應用程式監聽的埠號
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
