const router = require('express').Router();
const { signUp } = require('../controllers/signup.controllers.js')

router.post('/', signUp)

module.exports = router;