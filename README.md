# Adonis Phone Validator

Easy phone number validation, parsing and formatting for [adonis framework](http://adonisjs.com).

## Installation

1. Add package:

```bash
$ npm i adonis-phone-validator --save
```
or

```bash
$ yarn add adonis-phone-validator
```

2. Register providers inside the your bootstrap/app.js file.

```js
const providers = [
  ...
  'adonis-phone-validator/providers/PhoneValidatorProvider',
  ...
]
```
## Validation example

```js
// with country code and phone type
const rules = {
  phone: 'phone:RU,mobile'
}

const data = {
  phone: '+7 (800) 555-35-35'
}

yield Validator.validate(data, rules)

// without country code and with phone type (default country code: US)
const rules = {
  phone: 'phone:mobile'
}

const data = {
  phone: '+1-202-555-0120'
}

yield Validator.validate(data, rules)

// without country code and phone type (default country code: US)
const rules = {
  phone: 'phone'
}

const data = {
  phone: '+1-202-555-0120'
}

yield Validator.validate(data, rules)
```

Supported types:
 - premium_rate
 - toll_free
 - shared_cost
 - voip
 - personal_number
 - pager
 - uan
 - voicemail
 - fixed_line_or_mobile
 - fixed_line
 - mobile

For more information about supported types see [libphonenumber-js](https://github.com/halt-hammerzeit/libphonenumber-js).

## Sanitization example

```js
// parse phone
const rules = {
  phone: 'parse_phone:RU'
}

const data = {
  phone: '+7 (800) 555-35-35'
}

const sanitizedData = Validator.sanitize(data, rules) // 8005553535
// format phone to internation format
const rules = {
  phone: 'format_phone:RU,!i'
}

const data = {
  phone: '8005553535'
}

const sanitized = Validator.sanitize(data, rules) // +7 800 555 35 35
// format phone to national format
const rules = {
  phone: 'format_phone:RU,!n'
}

const data = {
  phone: '8005553535'
}

const sanitized = Validator.sanitize(data, rules) // 800 555-35-35
// format phone to international plaintext (E.164) format
const rules = {
  phone: 'format_phone:RU,!ip'
}

const data = {
  phone: '8005553535'
}

const sanitized = Validator.sanitize(data, rules) // +78005553535
```


## Credits

- [Evgeni Razumov](https://github.com/enniel)

## Support

Having trouble? [Open an issue](https://github.com/enniel/adonis-phone-validator/issues/new)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
