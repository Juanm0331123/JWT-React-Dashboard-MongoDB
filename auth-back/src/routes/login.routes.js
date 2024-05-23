const router = require('express').Router();
const { logIn } = require('../controllers/login.controllers.js')

router.post('/', logIn)

module.exports = router;