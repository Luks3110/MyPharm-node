const router = require('express').Router()
const authController = require('../controllers/Auth/Auth.controller')

// Register
router.post('/auth/cadastro', authController.register)
// Login
router.post("/auth/login", authController.login)
// Logout
router.get("/auth/logout", authController.logout)


module.exports = router