const express = require('express') // 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars') // 載入handlebars
const methodOverride = require('method-override') // 載入 method-override

const routes = require('./routes') // 引入路由器時路徑設定為 /routes 會自動尋找目錄下叫 index 的檔案
require('./config/mongoose')

const app = express()

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 設定載入靜態檔案
app.use(express.static('public'))
// setting body-parser // express已經有內建body-parser
// 只有使用者的請求先經過body-parser的解讀後，我們才能在req.body中取得表單傳送過來的資料。
app.use(express.urlencoded({ extended: true }))
// use method-override
app.use(methodOverride('_method'))

// !!!重構路由器，將 request 導入路由器!!!
app.use(routes)

// setting port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
