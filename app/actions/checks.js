import { AsyncStorage } from 'react-native'
import { url } from '../lib/server'
import { login } from './login'
import { setLoading, setSuccess, setFailed, setNavigate } from './processor'

export const checkIn = (item, customers, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_CHECK_IN'))
		try {
			const response = await fetch(`${url}/checks`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(item)
			})
			const data = await response.json()
			await fetch(`${url}/users/${item.id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({ id_check: data.id_check })
			})
			const responseUser = await AsyncStorage.getItem('session')
			const dataUser = await JSON.parse(responseUser)
			await dispatch(login(dataUser.email, dataUser.password))
			await dispatch(setNavigate('CustomerProfile', customers))
			await dispatch(setSuccess(true, 'SUCCESS_CHECK_IN'))
			await dispatch(setLoading(false, 'LOADING_CHECK_IN'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_CHECK_IN', e))
			dispatch(setLoading(false, 'LOADING_CHECK_IN'))
		}
	}
}

export const checkOut = accessToken => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_CHECK_IN'))
		try {
			await fetch(`${url}/users`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({ id_check: null })
			})
			await dispatch(setSuccess(true, 'SUCCESS_CHECK_IN'))
			await dispatch(setLoading(false, 'LOADING_CHECK_IN'))
			await dispatch(setSuccess(false, 'SUCCESS_CHECK_IN'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_CHECK_IN', e))
			dispatch(setLoading(false, 'LOADING_CHECK_IN'))
		}
	}
}
