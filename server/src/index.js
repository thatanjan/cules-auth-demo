import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { connect } from 'mongoose'
import jwt from 'jsonwebtoken'
import express from 'express'
import { hash, compareSync } from 'bcryptjs'
import { config } from 'dotenv'
import cors from 'cors'

import validateRegisterInput from 'validation/register'
import validateLoginInput from 'validation/login'

import User from 'models/User'

config()

connect(process.env.USER_DB, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true,
})
	.then(() => console.log('DB connected successfully'))
	.catch((err) => console.log(err))

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000

app.get('/hello', (_, res) => res.send('This is Cules Coding'))

app.post('/login', async ({ body }, res) => {
	try {
		const { errors, isValid } = validateLoginInput(body)

		if (!isValid) return res.status(400).json({ validationError: errors })

		const { email, password } = body

		const user = await User.findOne({ email })

		if (!user) return res.status(400).json({ errorMessage: 'User already exist' })

		const doesPasswordsMatch = compareSync(password, user.password)

		if (!doesPasswordsMatch)
			return res.status(400).json({ errorMessage: "Passwords doesn't match " })

		const { _id } = user

		const token = jwt.sign({ id: _id }, process.env.SECRET_KEY, {
			expiresIn: '7d',
		})

		if (token) return res.status(200).json({ token: `Bearer ${token}` })

		return res.status('400').json({ errorMessage: 'something went wrong' })
	} catch (e) {
		return res.status('400').json({ errorMessage: e.message })
	}
})

app.post('/register', async ({ body }, res) => {
	try {
		const { email, name, password } = body

		const { errors, isValid } = validateRegisterInput(body)

		if (!isValid) return res.status(400).json({ validationError: errors })

		const user = await User.findOne({ email })

		if (user) return res.status(400).json('User already exist')

		const hashedPassword = await hash(password, 10)

		const userModelData = {
			email,
			name,
			password: hashedPassword,
		}

		const newUser = new User(userModelData)

		await newUser.save()

		const { _id } = newUser

		const token = jwt.sign({ id: _id }, process.env.SECRET_KEY, {
			expiresIn: '7d',
		})

		if (token) return res.status(200).json({ token: `Bearer ${token}` })

		return res.status('400').json({ errorMessage: 'something went wrong' })
	} catch (err) {
		return res.status('400').json({ errorMessage: err.message })
	}
})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
