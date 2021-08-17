import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useRouter } from 'next/router'

import { LOG_IN, REGISTER } from '../../pages/auth/[auth]'

const CustomField = (props) => (
	<Field
		{...{ ...props, component: props.component || TextField }}
		sx={{ width: '100%', m: '.5rem 0' }}
	/>
)

const LoginForm = () => {
	const { push } = useRouter()
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validate={(values) => {
				const errors = {}
				if (!values.email) {
					errors.email = 'Required'
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
				) {
					errors.email = 'Invalid email address'
				}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)
					alert(JSON.stringify(values, null, 2))
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<CustomField
						component={TextField}
						variant='standard'
						name='email'
						type='email'
						label='Email'
					/>
					<CustomField
						component={TextField}
						type='password'
						variant='standard'
						label='Password'
						name='password'
					/>
					{isSubmitting && <LinearProgress />}
					<Button
						variant='contained'
						color='primary'
						fullWidth
						disabled={isSubmitting}
						onClick={submitForm}
						sx={{ mt: '1rem' }}
					>
						Submit
					</Button>

					<Button
						variant='contained'
						sx={{ m: '1rem 0' }}
						color='primary'
						fullWidth
						disabled={isSubmitting}
						onClick={() => push(`/auth/${REGISTER}`)}
					>
						Don't Have an account?
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default LoginForm
