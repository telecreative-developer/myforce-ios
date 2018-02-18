import {
	FETCH_CUSTOMERS_SUCCESS,
	FILTER_CUSTOMERS_WITH_ID,
	RECEIVE_CUSTOMER_PLACES,
	SELECTED_CUSTOMER_PLACE,
	INPUT_DATA_TO_CUSTOMER,
	CHECK_CUSTOMER
} from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { GOOGLE_PLACE_QUERY_AUTOCOMPLETE_KEY } from 'react-native-dotenv'
import { postPICS } from '../actions/pics'

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
				dispatch(postPICS({...data, id_customer: dataCustomer.id_customer}, dataCustomer, accessToken))
			})
			await dispatch(setSuccess(true, 'SUCCESS_ADD_CUSTOMER'))
			await dispatch(setLoading(false, 'LOADING_ADD_CUSTOMER'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_ADD_CUSTOMER', e))
			await dispatch(setLoading(false, 'LOADING_ADD_CUSTOMER'))
		}
	}
}

export const fetchCustomers = accessToken => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_CUSTOMERS'))
		try {
			const response = await fetch(`${url}/customers`, {
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
			await dispatch(
				setFailed(true, 'FAILED_FETCH_CUSTOMERS', 'Failed get data customers')
			)
			await dispatch(setLoading(false, 'LOADING_FETCH_CUSTOMERS'))
		}
	}
}

const fetchCustomersSuccess = data => {
	return {
		type: FETCH_CUSTOMERS_SUCCESS,
		payload: data
	}
}

export const filterCustomersWithId = id => {
	return {
		type: FILTER_CUSTOMERS_WITH_ID,
		id_user: id
	}
}

export const searchCustomersPlace = input => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SEARCH_CUSTOMERS_PLACE'))
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${input}&types=geocode&key=${GOOGLE_PLACE_QUERY_AUTOCOMPLETE_KEY}&language=id`
			)
			const data = await response.json()
			await dispatch(receiveCustomersPlace(data.predictions))
			await dispatch(setSuccess(true, 'SUCCESS_SEARCH_CUSTOMERS_PLACE'))
			await dispatch(setLoading(false, 'LOADING_SEARCH_CUSTOMERS_PLACE'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_SEARCH_CUSTOMERS_PLACE', e))
			await dispatch(setLoading(false, 'LOADING_SEARCH_CUSTOMERS_PLACE'))
		}
	}
}

const receiveCustomersPlace = data => ({
	type: RECEIVE_CUSTOMER_PLACES,
	payload: data
})

export const selectCustomerPlace = placeId => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SELECT_PLACE'))
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_PLACE_QUERY_AUTOCOMPLETE_KEY}`
			)
			const data = await response.json()
			await dispatch(selectedCustomerPlace(data.result))
			await dispatch(inputDataToCustomer(data.result))
			await dispatch(setSuccess(true, 'SUCCESS_SELECT_PLACE'))
			await dispatch(setLoading(false, 'LOADING_SELECT_PLACE'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_SELECT_PLACE', e))
			await dispatch(setLoading(false, 'LOADING_SELECT_PLACE'))
		}
	}
}

export const selectedCustomerPlace = data => ({
	type: SELECTED_CUSTOMER_PLACE,
	payload: data
})

export const inputDataToCustomer = (data) => ({
	type: INPUT_DATA_TO_CUSTOMER,
	payload: {
		name: data.name,
		description: data.formatted_address,
		latitude: data.geometry.location.lat,
		longitude: data.geometry.location.lng
	}
})

export const checkCustomer = (lat, lng, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_CHECK_CUSTOMER'))
		try {
			const response = await fetch(`${url}/customers?latitude=${parseFloat(lat).toPrecision(6)}&longitude=${parseFloat(lng).toPrecision(6)}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(checkCustomerSuccess(data.data))
			await dispatch(setSuccess(true, 'SUCCESS_CHECK_CUSTOMER'))
			await dispatch(setLoading(false, 'LOADING_CHECK_CUSTOMER'))
			await dispatch(setSuccess(false, 'SUCCESS_CHECK_CUSTOMER'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_CHECK_CUSTOMER', e))
			await dispatch(setLoading(false, 'LOADING_CHECK_CUSTOMER'))
		}
	}
}

const checkCustomerSuccess = (data) => ({
	type: CHECK_CUSTOMER,
	payload: data
})
