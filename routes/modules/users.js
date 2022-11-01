const express = require('express') // use express
const router = express.Router() // use express router
const User = require('../../models/user') // 載入user model

// login page
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {

})
// register page
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數，這裡使用「解構賦值語法」，減少一筆一筆取出屬性的動作，可以速寫整個過程
  const { name, email, password, confirmPassword } = req.body
  //使用User model 裡的 email 去比對，findOne指定的參數格式是物件，所以帶入的參數要記得加大括號
  User.findOne({ email })
    .then(user => {
      // 若email已存在，不給予註冊，退回原畫面，並帶入使用者已填的註冊表單參數
      if (user) {
        console.log('User already exists.')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        // 如果還沒註冊：寫入資料庫
        return User.create({ // use User model 
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
        // 另一種寫法，先產生物件實例，再把實例存入User
        // const newUser = new User({
        //   name,
        //   email,
        //   password
        // })
        // newUser.save()
        // .then(() => res.redirect('/'))
        // .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

module.exports = router