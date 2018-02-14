import {
	FETCH_CUSTOMERS_SUCCESS,
	FILTER_CUSTOMERS_WITH_ID,
	RECEIVE_CUSTOMER_PLACES,
	SELECTED_CUSTOMER_PLACE,
	INPUT_DATA_TO_CUSTOMER
} from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { GOOGLE_PLACE_QUERY_AUTOCOMPLETE_KEY } from 'react-native-dotenv'

export const fetchCustomers = accessToken => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_CUSTOMERS'))
		await dispatch(setFailed(false, 'FETCH_CUSTOMERS'))
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
			await dispatch(setSuccess(true, 'FETCH_CUSTOMERS'))
			await dispatch(setLoading(false, 'FETCH_CUSTOMERS'))
		} catch (e) {
			await dispatch(
				setFailed(true, 'FETCH_CUSTOMERS', 'Failed get data customers')
			)
			await dispatch(setLoading(false, 'fetch_customers'))
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
