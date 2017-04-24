'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const libPhoneNumber = require('libphonenumber-js')

/**
 * @module Validations
 * @description List of schema validations
 * @type {Object}
 */
let Validations = exports = module.exports = {}

/**
 * @description validate phone number.
 * @method phone
 * @param  {Object} data
 * @param  {String} field
 * @param  {String} message
 * @param  {Array} args
 * @param  {Function} get
 * @return {Object}
 * @public
 */
Validations.phone = function (data, field, message, args, get) {
  return new Promise((resolve, reject) => {
    const fieldValue = get(data, field)
    if (!fieldValue) {
      return resolve('validation skipped')
    }
    const isValid = libPhoneNumber.isValidNumber(fieldValue, ...args)
    if (isValid) {
      resolve('valid')
    } else {
      reject(message)
    }
  })
}
