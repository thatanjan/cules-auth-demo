import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

export default function MyApp(props) {
	const { Component, pageProps } = props

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<>
			<CssBaseline />
			<Component {...pageProps} />
		</>
	)
}
