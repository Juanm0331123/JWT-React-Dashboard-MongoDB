const router = require('express').Router();
const { logIn } = require('../controllers/login.controllers.js')

router.get('/', logIn)

module.exports = router;