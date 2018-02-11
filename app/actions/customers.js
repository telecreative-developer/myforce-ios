import { FETCH_CUSTOMERS_SUCCESS, FILTER_CUSTOMERS_WITH_ID } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

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
