import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'

export const register = item => {
	return async dispatch => {
		await dispatch(setLoading({ condition: true, process_on: 'register' }))
		await dispatch(
			setFailed({ condition: false, process_on: 'register', message: '' })
		)
		try {
			const response = await fetch(`${url}/users`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(item)
			})
			const data = await response.json()
			if (data.code === 400 && data.errors[0].path === 'username') {
				await dispatch(
					setFailed({
						condition: true,
						process_on: 'register',
						message: 'Username already used'
					})
				)
				await dispatch(setLoading({ condition: false, process_on: 'register' }))
			} else if (data.code === 400 && data.errors[0].path === 'email') {
				await dispatch(
					setFailed({
						condition: true,
						process_on: 'register',
						message: 'Email already used'
					})
				)
				await dispatch(setLoading({ condition: false, process_on: 'register' }))
			} else {
				await dispatch(setLoading({ condition: false, process_on: 'register' }))
			}
		} catch (e) {
			await dispatch(
				setFailed({ condition: true, process_on: 'register', message: e })
			)
			await dispatch(setLoading({ condition: false, process_on: 'register' }))
		}
	}
}
