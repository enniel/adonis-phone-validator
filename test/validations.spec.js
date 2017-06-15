'use strict'

/**
 * adonis-phone-validator
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const Validations = require('../src/Validations')
const _ = require('lodash')
const chai = require('chai')
const expect = chai.expect

require('co-mocha')

describe('Validations', function () {
  it('should return error when field is defined and does not have valid phone', function * () {
    const data = {phone: '+1-213-373'}
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const args = []
    try {
      const passes = yield Validations.phone(data, field, message, args, get)
      expect(passes).not.to.exist()
    } catch (e) {
      expect(e).to.equal(message)
    }
  })

  it('should return error when field is defined as negative boolean', function * () {
    const data = {phone: false}
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const args = []
    try {
      const passes = yield Validations.phone(data, field, message, args, get)
      expect(passes).not.to.exist()
    } catch (e) {
      expect(e).to.equal(message)
    }
  })

  it('should return error when field is defined as 0', function * () {
    const data = {phone: 0}
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const args = []
    try {
      const passes = yield Validations.phone(data, field, message, args, get)
      expect(passes).not.to.exist()
    } catch (e) {
      expect(e).to.equal(message)
    }
  })

  it('should skip phone validation when phone field does not exists', function * () {
    const data = {}
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const args = []
    const passes = yield Validations.phone(data, field, message, args, get)
    expect(passes).to.equal('validation skipped')
  })

  it('should work fine when valid phone is provided', function * () {
    const data = {phone: '+1-213-373-4253'}
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const args = []
    const passes = yield Validations.phone(data, field, message, args, get)
    expect(passes).to.equal('validation passed')
  })

  it('should work fine when valid phone with country code is provided', function * () {
    const data = {phone: '+7 (800) 555-35-35'}
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const args = [
      'RU'
    ]
    const passes = yield Validations.phone(data, field, message, args, get)
    expect(passes).to.equal('validation passed')
  })

  it('should work fine when valid phone with country code and type is provided', function * () {
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const tollFree = yield Validations.phone({
      phone: '+7 (800) 555-35-35'
    }, field, message, [
      'RU', 'toll_free'
    ], get)
    const fixedLine = yield Validations.phone({
      phone: '4957777777'
    }, field, message, [
      'RU', 'fixed_line'
    ], get)
    const mobile = yield Validations.phone({
      phone: '9150000000'
    }, field, message, [
      'RU', 'mobile'
    ], get)
    const premiumRate = yield Validations.phone({
      phone: '8030000000'
    }, field, message, [
      'RU', 'premium_rate'
    ], get)
    const fixedLineOrMobile = yield Validations.phone({
      phone: '2133734253'
    }, field, message, [
      'fixed_line_or_mobile'
    ], get)
    const personalNumber = yield Validations.phone({
      phone: '5002345678'
    }, field, message, [
      'US', 'personal_number'
    ], get)
    expect(tollFree).to.equal('validation passed')
    expect(fixedLine).to.equal('validation passed')
    expect(mobile).to.equal('validation passed')
    expect(premiumRate).to.equal('validation passed')
    expect(fixedLineOrMobile).to.equal('validation passed')
    expect(personalNumber).to.equal('validation passed')
  })

  it('should return error when phone not mobile', function * () {
    const data = {phone: '+7 (800) 555-35-35'}
    const field = 'phone'
    const message = 'phone is not valid phone number'
    const get = _.get
    const args = [
      'RU', 'mobile'
    ]
    try {
      const passes = yield Validations.phone(data, field, message, args, get)
      expect(passes).not.to.exist()
    } catch (e) {
      expect(e).to.equal(message)
    }
  })
})
