const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth/AuthController')


router.get('/login', authController.login)
router.post('/signIn', authController.signIn)
router.get('/register', authController.register)
router.post('/register/create', authController.registerCreate)
router.get('/logout', authController.logout)



module.exports = router