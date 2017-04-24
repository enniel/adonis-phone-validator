'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const fold = require('adonis-fold')
const path = require('path')

fold.Registrar.register([
  'adonis-validation-provider/providers/ValidatorProvider',
  path.join(__dirname, '../providers/PhoneValidatorProvider')
])

const Validator = fold.Ioc.use('Adonis/Addons/Validator')

const rules = {
  phone: 'phone:RU'
}

const data = {
  phone: '+7 (915) 999 99 99'
}

Validator
  .validate(data, rules)
  .then(function () {
    console.log('validation passed')
  })
  .catch(function (errors) {
    console.log('validation failed')
  })
