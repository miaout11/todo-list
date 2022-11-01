const express = require('express') // use express
const router = express.Router() // use express router

// login page
router.get('/login', (req, res) => {
  res.render('login')
})
// login data
router.post('/login', (req, res) => {

})
// register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router