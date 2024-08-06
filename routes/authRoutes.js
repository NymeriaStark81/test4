const authController = require('../controllers/authController')

const router = require('express').Router()

router.post('/login', authController.user_login)

module.exports = router