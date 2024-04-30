const router = require('express').Router();
const { todos } = require('../controllers/todos.controllers.js')

router.get('/', todos)

module.exports = router;