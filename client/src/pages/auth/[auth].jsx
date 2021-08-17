import React from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'

export const LOG_IN = 'login'
export const REGISTER = 'register'

const Auth = () => {
	const {
		query: { auth },
	} = useRouter()

	return (
		<Grid container justifyContent='center' sx={{ maxHeight: '100vh' }}>
			<Grid item xs={10} justifyContent='center'></Grid>
			<Grid
				item
				sx={{ height: '15rem', display: 'grid', placeItems: 'center' }}
				xs={10}
			>
				<Typography variant='h2'>Cules Auth App</Typography>
			</Grid>

			<Grid
				item
				xs={3}
				sx={{
					display: 'grid',
					p: '2rem 1rem',
					placeItems: 'center',
					'& form': {
						width: '90%',
					},
				}}
				component={Paper}
				elevation={7}
			>
				{auth === LOG_IN && <LoginForm />}
				{auth === REGISTER && <RegisterForm />}
			</Grid>
		</Grid>
	)
}

export default Auth
