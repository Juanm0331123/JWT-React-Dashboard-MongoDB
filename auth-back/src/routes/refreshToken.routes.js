const router = require('express').Router();
const { refreshToken } = require('../controllers/refreshToken.controllers.js')

router.get('/', refreshToken)

module.exports = router;