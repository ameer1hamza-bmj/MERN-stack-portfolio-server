const express = require('express')
const contactForm = require('../controllers/contact-controller')
const validate = require('../Middlewares/validate-middleware')
const contactValidation = require('../Validators/contact-validator')
const router = express.Router()

router.route('/contact').post(validate(contactValidation), contactForm)


module.exports = router