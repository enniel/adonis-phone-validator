'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const indicative = require('indicative')
const Validations = require('../src/Validations')

indicative.extend('phone', Validations.phone, '{{field}} is not valid phone number')

const rules = {
  phone: 'phone:RU'
}

const data = {
  phone: '+7 (915) 999 99 99'
}

indicative
  .validate(data, rules)
  .then(function () {
    console.log('validation passed')
  })
  .catch(function (errors) {
    console.log('validation failed')
  })
