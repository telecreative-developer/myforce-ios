import { ADD_PIC, REMOVE_PIC, PICS_CUSTOMERS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const postPICS = (data, dataCustomer, accessToken) => {
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
			await dispatch(setSuccess(true, 'SUCCESS_ADD_PIC', dataCustomer))
			await dispatch(setLoading(false, 'LOADING_ADD_PIC'))
			await dispatch(setSuccess(false, 'SUCCESS_ADD_PIC'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_ADD_PIC', e))
			await dispatch(setLoading(false, 'LOADING_ADD_PIC'))
		}
	}
}

export const addPIC = (data) => ({
	type: ADD_PIC,
	payload: data
})

export const removePic = (data) => ({
	type: REMOVE_PIC,
	payload: data
})

export const fetchPicsWithIDCustomer = (id_customer, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		try {
			const response = await fetch(`${url}/pics?id_customer=${id_customer}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchPicsWithIDCustomerSuccess(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_PICS_WITH_IDCUSTOMERS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		} catch (e) {
			await dispatch(
				setFailed(true, 'FAILED_FETCH_PICS_WITH_IDCUSTOMERS', 'Failed get data customers')
			)
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		}
	}
}

export const fetchPicsWithIDCustomerSuccess = (data) => ({
	type: PICS_CUSTOMERS,
	payload: data
})