'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const { ServiceProvider } = require('@adonisjs/fold')
const Validations = require('../src/Validations')
const RawValidations = require('../src/RawValidations')
const Sanitizors = require('../src/Sanitizors')

class PhoneValidatorProvider extends ServiceProvider {
  boot () {
    const Validator = this.app.use('Adonis/Addons/Validator')

    Validator.is.extend('phone', RawValidations.phone)
    Validator.extend('phone', Validations.phone, '{{field}} is not valid phone number')
    Validator.sanitizor.extend('parsePhone', Sanitizors.parsePhone)
    Validator.sanitizor.extend('formatPhone', Sanitizors.formatPhone)
  }
}

module.exports = PhoneValidatorProvider
