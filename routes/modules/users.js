const express = require('express') // 載入express
const router = express.Router() // 載入express router

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router