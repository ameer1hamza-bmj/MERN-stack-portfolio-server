const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/auth-controller')
const validate = require('../Middlewares/validate-middleware')
const { signupValidation, signinValidation } = require('../Validators/auth-validator')
const verifyToken = require('../Middlewares/verifyToken')

router.route('/registration').post(validate(signupValidation), auth_controller.registration)
router.route('/login').post(validate(signinValidation), auth_controller.login)
router.route('/users').get(verifyToken, auth_controller.getUser)

module.exports = router