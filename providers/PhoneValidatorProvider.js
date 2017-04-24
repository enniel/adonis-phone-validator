'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const ServiceProvider = require('adonis-fold').ServiceProvider
const Validations = require('../src/Validations')

class PhoneValidatorProvider extends ServiceProvider {
  * boot () {
    const Validator = this.app.use('Adonis/Addons/Validator')

    Validator.extend('phone', Validations.phone, '{{field}} is not valid phone number')
  }
}

module.exports = PhoneValidatorProvider
