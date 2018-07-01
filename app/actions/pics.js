import {
	ADD_PIC,
	REMOVE_ALL_PIC,
	REMOVE_PIC,
	PICS_CUSTOMERS,
	FETCH_PICS_SUCCESS
} from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

let initialIdPic = 0

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
			await dispatch(removeAllPic())
			await dispatch(setSuccess(true, 'SUCCESS_ADD_PIC', dataCustomer))
			await dispatch(setLoading(false, 'LOADING_ADD_PIC'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_ADD_PIC', e))
			dispatch(setLoading(false, 'LOADING_ADD_PIC'))
		}
	}
}

export const addPIC = data => ({
	type: ADD_PIC,
	payload: { pic_id: initialIdPic++, ...data }
})

export const removePic = data => ({
	type: REMOVE_PIC,
	payload: data
})

const removeAllPic = (data = []) => ({
	type: REMOVE_ALL_PIC,
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
			{console.log(data.data)}
			await dispatch(fetchPicsWithIDCustomerSuccess(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_PICS_WITH_IDCUSTOMERS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		} catch (e) {
			dispatch(
				setFailed(
					true,
					'FAILED_FETCH_PICS_WITH_IDCUSTOMERS',
					'Failed get data customers'
				)
			)
			dispatch(setLoading(false, 'LOADING_FETCH_PICS_WITH_IDCUSTOMERS'))
		}
	}
}

export const fetchPicsWithIDCustomerSuccess = data => ({
	type: PICS_CUSTOMERS,
	payload: data
})

export const fetchPics = accessToken => {
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
			{console.log(data.data)}
			await dispatch(fetchPicsSuccess(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_PICS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PICS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_PICS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_PICS'))
		}
	}
}

export const fetchPicsSuccess = data => ({
	type: FETCH_PICS_SUCCESS,
	payload: data
})

export const updatePic = (items, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_UPDATE_PIC'))
		try {
			const response = await fetch(`${url}/pics/${items.id_pic}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(items)
			})
			const data = await response.json()
			{console.log(data)}
			// await dispatch(fetchPicsWithIDCustomer(data))
			await dispatch(setSuccess(false, 'SUCCESS_UPDATE_PIC'))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PIC'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_UPDATE_PIC', e))
			dispatch(setLoading(false, 'LOADING_UPDATE_PIC'))
		}
	}
}

export const deletePic = (items, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_UPDATE_PIC'))
		try {
			const response = await fetch(`${url}/pics/${items.id_pic}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(items)
			})
			const data = await response.json()
			{console.log(data)}
			// await dispatch(fetchPicsWithIDCustomer(data))
			await dispatch(setSuccess(false, 'SUCCESS_UPDATE_PIC'))
			await dispatch(setLoading(false, 'LOADING_UPDATE_PIC'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_UPDATE_PIC', e))
			dispatch(setLoading(false, 'LOADING_UPDATE_PIC'))
		}
	}
}