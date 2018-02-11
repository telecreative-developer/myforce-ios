import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'
import { saveSessionForLocal, saveSessionForPersistance } from './session'

export const login = (email, password) => {
	return async dispatch => {
		await dispatch(setLoading({ condition: true, process_on: 'login' }))
		await dispatch(
			setFailed({ condition: false, process_on: 'login', message: '' })
		)
		try {
			const response = await fetch(`${url}/authentication`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password, strategy: 'local' })
			})
			const data = await response.json()
			if (data.code === 401 && data.name === 'NotAuthenticated') {
				await dispatch(
					setFailed({
						condition: true,
						process_on: 'login',
						message: 'Email or password incorrect'
					})
				)
				await dispatch(setLoading({ condition: false, process_on: 'login' }))
			} else {
				await dispatch(fetchUserWithEmail(email, password, data.accessToken))
			}
		} catch (e) {
			await dispatch(
				setFailed({ condition: true, process_on: 'login', message: e })
			)
			await dispatch(setLoading({ condition: false, process_on: 'login' }))
		}
	}
}

const fetchUserWithEmail = (email, password, accessToken) => {
	return async dispatch => {
		await dispatch(
			setLoading({ condition: true, process_on: 'fetch_user_with_email' })
		)
		try {
			const response = await fetch(`${url}/users?email=${email}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(saveSessionForLocal({ email, password, accessToken }))
			await dispatch(
				saveSessionForPersistance({
					data: data.data[0],
					accessToken: accessToken
				})
			)
			await dispatch(
				setLoading({ condition: false, process_on: 'fetch_user_with_email' })
			)
		} catch (e) {
			await dispatch(
				setFailed({
					condition: true,
					process_on: 'fetch_user_with_email',
					message: e
				})
			)
			await dispatch(
				setLoading({ condition: false, process_on: 'fetch_user_with_email' })
			)
		}
	}
}
