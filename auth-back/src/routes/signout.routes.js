const router = require('express').Router();
const { signout } = require('../controllers/signout.controllers.js')

router.get('/', signout)

module.exports = router;