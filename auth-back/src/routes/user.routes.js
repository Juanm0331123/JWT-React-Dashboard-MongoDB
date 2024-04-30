const router = require('express').Router();
const { user } = require('../controllers/user.controllers.js')

router.get('/', user)

module.exports = router;