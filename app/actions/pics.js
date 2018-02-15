import { RECEIVE_PICS_SUCCESS, CHOOSE_PIC } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const addPIC = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_ADD_PIC'))
		try {
			await fetch(`${url}/pics`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(fetchPICs(accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_ADD_PIC'))
			await dispatch(setLoading(false, 'LOADING_ADD_PIC'))
			await dispatch(setSuccess(false, 'SUCCESS_ADD_PIC'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_ADD_PIC', e))
			await dispatch(setLoading(false, 'LOADING_ADD_PIC'))
		}
	}
}

export const fetchPICs = (accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_PICS'))
		try {
			const response = await fetch(`${url}/pics`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			const datas = await data.data.map(d => {
				let object = Object.assign({}, d)
				object.checked = false
  			return object
			})
			await dispatch(receivePICs(datas))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_PICS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS'))
			await dispatch(setSuccess(false, 'SUCCESS_FETCH_PICS'))
		} catch (e) {
			await dispatch(
				setFailed(true, 'FAILED_FETCH_PICS', 'Failed get data customers')
			)
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS'))
		}
	}
}

const receivePICs = data => ({
	type: RECEIVE_PICS_SUCCESS,
	payload: data
})

export const choosePIC = (data, checked) => ({
	type: CHOOSE_PIC,
	payload: {
		...data,
		checked
	}
})