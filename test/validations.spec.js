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

  it('should skip phone validation when email field does not exists', function * () {
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
})
