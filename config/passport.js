const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStratege = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStratege({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'This email is not registered!'))
        }
        // bcrypt.compare(password, user.password) 第一個參數是使用者的輸入值，而第二個參數是資料庫裡的雜湊值，bcrypt 會幫我們做比對，並回傳布林值
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化跟反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}