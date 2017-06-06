'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const libPhoneNumber = require('libphonenumber-js')

/**
 * @module Sanitizors
 * @description List of sanitizors
 * @type {Object}
 */
let Sanitizors = exports = module.exports = {}

/**
 * @description parse a phone number
 * @method parsePhone
 * @param  {String}       value
 * @param  {Array}       args
 * @return {String}
 * @public
 */
Sanitizors.parsePhone = function (value, args) {
  let country = 'US'

  if (args instanceof Array) {
    country = args[0]
  }

  if (typeof (value) !== 'string') {
    return value
  }

  const { phone } = libPhoneNumber.parse(value, country)

  return phone
}

/**
 * @description format a phone number
 * @method formatPhone
 * @param  {String}       value
 * @param  {Array}       args
 * @return {String}
 * @public
 */
Sanitizors.formatPhone = function (value, args) {
  const options = {
    country: 'US',
    format: 'International'
  }

  if (args instanceof Array) {
    if (args[0]) {
      options.country = args[0]
    }
    if (args[1] === '!i') {
      options.format = 'International'
    }
    if (args[1] === '!n') {
      options.format = 'National'
    }
    if (args[1] === '!ip') {
      options.format = 'International_plaintext'
    }
  }

  if (typeof (value) !== 'string') {
    return value
  }

  return libPhoneNumber.format(value, options.country, options.format)
}
