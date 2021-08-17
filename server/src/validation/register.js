import Validator from 'validator'
import isEmpty from './is_empty'

const validateRegisterInput = (data) => {
	const theData = data

	const errors = {}

	const validatorProperties = ['name', 'email', 'password', 'confirmPassword']

	validatorProperties.forEach((property) => {
		theData[property] = !isEmpty(theData[property]) ? theData[property] : ''
	})

	if (!Validator.isLength(theData.name, { min: 3, max: 30 })) {
		errors.name = 'Name must be between 3 and 30'
	}

	if (Validator.isEmpty(theData.name)) {
		errors.name = 'name field is required'
	}

	if (Validator.isEmpty(theData.email)) {
		errors.email = 'email field is required'
	}

	if (!Validator.isEmail(theData.email)) {
		errors.email = 'invalid email address'
	}

	if (Validator.isEmpty(theData.password)) {
		errors.password = 'password is invalid'
	}

	if (!Validator.isLength(theData.password, { min: 6, max: 30 })) {
		errors.password = 'password must be between 6 to 30 characters long'
	}

	if (Validator.isEmpty(theData.confirmPassword)) {
		errors.confirmPassword = 'confirm password field is required'
	}

	if (!Validator.equals(theData.password, theData.confirmPassword)) {
		errors.confirmPassword = 'passwords must match'
	}
	return {
		errors,
		isValid: isEmpty(errors),
	}
}

export default validateRegisterInput
