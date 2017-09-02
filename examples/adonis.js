'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const { registrar, ioc } = require('@adonisjs/fold')
const path = require('path')

registrar
  .providers([
    '@adonisjs/validator/providers/ValidatorProvider',
    path.join(__dirname, '../providers/PhoneValidatorProvider')
  ])
  .register()

const Validator = ioc.use('Adonis/Addons/Validator')

const rules = {
  phone: 'phone:RU'
}

const data = {
  phone: '+7 (800) 555-35-35'
}

Validator
  .validate(data, rules)
  .then(function () {
    console.log('validation passed')
  })
  .catch(function (errors) {
    console.log('validation failed')
  })
