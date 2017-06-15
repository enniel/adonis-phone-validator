'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const libPhoneNumber = require('libphonenumber-js')
const Modes = require('indicative/src/Modes')
const Raw = require('indicative/src/Raw')
const _ = require('lodash')

const TYPES = [
  'premium_rate',
  'toll_free',
  'shared_cost',
  'voip',
  'personal_number',
  'pager',
  'uan',
  'voicemail',
  'fixed_line_or_mobile',
  'fixed_line',
  'mobile'
]

/**
 * @module Validations
 * @description List of schema validations
 * @type {Object}
 */
let Validations = exports = module.exports = {}

/**
 * @description figures out whether value can be skipped
 * or not from validation, as non-existing values
 * should be validated using required.
 * @method skippable
 * @param  {Mixed}  value
 * @return {Boolean}
 * @private
 */
const skippable = function (value) {
  return Modes.get() === 'strict' ? typeof value === 'undefined' : !Raw.existy(value)
}

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
    if (skippable(fieldValue)) {
      resolve('validation skipped')
      return
    }
    let country = 'US'
    let type = null
    if (args instanceof Array && args.length) {
      if (_.includes(TYPES, args[0])) {
        type = args[0]
      } else if (args[1]) {
        country = args[0]
        type = args[1]
      } else {
        country = args[0]
      }
    }

    const isValid = libPhoneNumber.isValidNumber(fieldValue, country)
    if (isValid) {
      if (type && country) {
        if (_.snakeCase(libPhoneNumber.getNumberType(fieldValue, country)) === type) {
          return resolve('validation passed')
        }
        return reject(message)
      }
      resolve('validation passed')
    } else {
      reject(message)
    }
  })
}
