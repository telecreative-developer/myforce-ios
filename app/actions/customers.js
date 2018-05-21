import {
	FETCH_CUSTOMERS_SUCCESS,
	RECEIVE_CUSTOMER_PLACES,
	INPUT_DATA_TO_CUSTOMER
} from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { postPICS } from '../actions/pics'
import { checkIn } from '../actions/checks'

export const postCustomer = (data, dataPIC, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_ADD_CUSTOMER'))
		try {
			const response = await fetch(`${url}/customers`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			const dataCustomer = await response.json()
			await dataPIC.forEach((data, index) => {
				dispatch(
					postPICS({ ...data, id_customer: dataCustomer.id_customer }, dataCustomer, accessToken)
				)
			})
			await dispatch(
				checkIn(
					{
						id: data.id,
						id_customer: dataCustomer.id_customer,
						longitude: dataCustomer.longitude,
						latitude: dataCustomer.latitude
					},
					dataCustomer,
					accessToken
				)
			)
			await dispatch(setSuccess(true, 'SUCCESS_ADD_CUSTOMER'))
			await dispatch(setLoading(false, 'LOADING_ADD_CUSTOMER'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_ADD_CUSTOMER', e))
			dispatch(setLoading(false, 'LOADING_ADD_CUSTOMER'))
		}
	}
}

export const fetchCustomers = (id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_CUSTOMERS'))
		try {
			const response = await fetch(`${url}/customers?id=${id}&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchCustomersSuccess(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_CUSTOMERS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_CUSTOMERS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_CUSTOMERS', 'Failed get data customers'))
			dispatch(setLoading(false, 'LOADING_FETCH_CUSTOMERS'))
		}
	}
}

const fetchCustomersSuccess = data => ({
	type: FETCH_CUSTOMERS_SUCCESS,
	payload: data
})

export const searchCustomersPlace = (input, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SEARCH_CUSTOMERS_PLACE'))
		try {
			const response = await fetch(`${url}/customers?name[$like]=%${input}%`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(receiveCustomersPlace(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_SEARCH_CUSTOMERS_PLACE'))
			await dispatch(setLoading(false, 'LOADING_SEARCH_CUSTOMERS_PLACE'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_SEARCH_CUSTOMERS_PLACE', e))
			dispatch(setLoading(false, 'LOADING_SEARCH_CUSTOMERS_PLACE'))
		}
	}
}

const receiveCustomersPlace = data => ({
	type: RECEIVE_CUSTOMER_PLACES,
	payload: data
})

export const inputDataToCustomer = data => ({
	type: INPUT_DATA_TO_CUSTOMER,
	payload: {
		name: data.name,
		description: data.formatted_address,
		latitude: data.geometry.location.lat,
		longitude: data.geometry.location.lng
	}
})
