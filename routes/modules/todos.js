// todos模組 放 /todos 相關的路由
const express = require('express') // 載入express
const router = express.Router() // 載入express router
const Todo = require('../../models/todo') // 引用 Todo model

// setting create's route
router.get('/new', (req, res) => {
    return res.render('new')
})
router.post('/', (req, res) => {
    const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
    return Todo.create({ name }) // call Todo 直接新增資料
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})
// setting detail page 使用動態參數":"，可以用req.params取出
router.get('/:id', (req, res) => {
    return Todo.findById(req.params.id) // 從資料庫找出特定一筆todo資料(使用findById)並用req.params取出資料
        .lean() // 把資料轉換成單純的JS物件
        .then(todo => res.render('detail', { todo })) // 將資料傳給 detail(前端) 樣板
        .catch(error => console.error(error))
})
// setting edit page
router.get('/:id/edit', (req, res) => {
    return Todo.findById(req.params.id)
        .lean()
        .then(todo => res.render('edit', { todo }))
        .catch(error => console.error(error))
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, isDone } = req.body
    return Todo.findById(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.error(error))
})
// setting delete route
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

module.exports = router // 匯出router模組