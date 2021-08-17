import Validator from 'validator'
import isEmpty from 'validation/is_empty'

const validateLoginInput = (data) => {
	const input = data
	const errors = {}

	const validatorProperties = ['email', 'password']

	for (let property in input) {
		input[property] = !isEmpty(input[property]) ? input[property] : ''
	}

	if (!Validator.isEmail(input.email)) {
		errors.email = 'invalid email address'
		errors.email[0].toUpperCase()
	}

	if (Validator.isEmpty(input.email)) {
		errors.email = 'email field is required'
		errors.email[0].toUpperCase()
	}

	if (Validator.isEmpty(input.password)) {
		errors.password = 'password is required'
		errors.password[0].toUpperCase()
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

export default validateLoginInput
