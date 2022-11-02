// todos模組 放 /todos 相關的路由
const express = require('express') // 載入express
const router = express.Router() // 載入express router
const Todo = require('../../models/todo') // 引用 Todo model

// setting create's route
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id  // 增加限制條件，只有登入者本人可以增刪找查到自己的資料
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name, userId }) // call Todo 直接新增資料
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
// setting detail page 使用動態參數":"，可以用req.params取出
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id // 改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id。
  return Todo.findOne({ _id, userId }) // 從資料庫找出特定一筆todo資料(使用findById)並用req.params取出資料
    .lean() // 把資料轉換成單純的JS物件
    .then(todo => res.render('detail', { todo })) // 將資料傳給 detail(前端) 樣板
    .catch(error => console.error(error))
})
// setting edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.error(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.error(error))
})
// setting delete route
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router // 匯出router模組
