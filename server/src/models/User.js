import { Schema, model } from 'mongoose'

const requiredStringType = {
	type: String,
	required: true,
}

const schema = new Schema({
	name: requiredStringType,
	email: requiredStringType,
	password: requiredStringType,
	date: {
		type: Date,
		default: Date.now,
	},
})

const User = model('user', schema)

export default User
