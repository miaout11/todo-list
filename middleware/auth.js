// 設定檔會匯出一個物件，物件理是一個叫 authenticator 的函式
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}

// next用法：生產線上的員工協力把輸送進來的「原料」(request) 一步步處理加工，完成最後的「製成品」(response)。當一個 middleware 把事情做完之後，它就會呼叫 next() 把請求交給下一個 middleware 來處理。

// req.isAuthenticated() 是 Passport.js 提供的函式，會根據 request 的登入狀態回傳 true 或 false。如果 req.isAuthenticated() 回傳 true，則我們執行下一個 middleware，通常就會進入路由的核心功能，如果是 false，就強制返回 login 頁面。