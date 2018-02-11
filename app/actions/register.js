import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'

export const register = item => {
	return async dispatch => {
		await dispatch(setLoading(true, 'PROCESS_REGISTER'))
		await dispatch(setFailed(false, 'PROCESS_REGISTER'))
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
					setFailed(true, 'PROCESS_REGISTER', 'Username already used')
				)
				await dispatch(setLoading(false, 'PROCESS_REGISTER'))
			} else if (data.code === 400 && data.errors[0].path === 'email') {
				await dispatch(
					setFailed(true, 'PROCESS_REGISTER', 'Email already used')
				)
				await dispatch(setLoading(false, 'PROCESS_REGISTER'))
			} else {
				await dispatch(setSuccess(true, 'PROCESS_REGISTER'))
				await dispatch(setLoading(false, 'PROCESS_REGISTER'))
			}
		} catch (e) {
			await dispatch(setFailed(true, 'PROCESS_REGISTER', e))
			await dispatch(setLoading(false, 'PROCESS_REGISTER'))
		}
	}
}
