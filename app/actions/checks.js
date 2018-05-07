import { AsyncStorage } from 'react-native'
import { FETCH_DATA_CHECK_IN } from '../constants'
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
			const a = await fetch(`${url}/users/${item.id}`, {
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

export const fetchDataCheckIn = (id_check, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_DATA_CHECK_IN'))
		try {
			const response = await fetch(`${url}/checks?id_check=${id_check}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchDataCheckInSuccess(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_DATA_CHECK_IN'))
			await dispatch(setLoading(false, 'LOADING_FETCH_DATA_CHECK_IN'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_DATA_CHECK_IN', e))
			dispatch(setLoading(false, 'LOADING_FETCH_DATA_CHECK_IN'))
		}
	}
}

const fetchDataCheckInSuccess = (data) => ({
	type: FETCH_DATA_CHECK_IN,
	payload: data
})

export const checkOut = (id_check, id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_CHECK_OUT'))
		try {
			await fetch(`${url}/checks?id_check=${id_check}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({checkout: true})
			})
			await fetch(`${url}/users/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({ id_check: null })
			})
			const responseUser = await AsyncStorage.getItem('session')
			const dataUser = await JSON.parse(responseUser)
			await dispatch(login(dataUser.email, dataUser.password))
			await dispatch(fetchDataCheckIn(id_check, accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_CHECK_OUT'))
			await dispatch(setLoading(false, 'LOADING_CHECK_OUT'))
			await dispatch(setSuccess(false, 'SUCCESS_CHECK_OUT'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_CHECK_OUT', e))
			dispatch(setLoading(false, 'LOADING_CHECK_OUT'))
		}
	}
}
