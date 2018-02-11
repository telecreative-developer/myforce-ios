import { FETCH_PRODUCTS_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const fetchProducts = accessToken => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_PRODUCTS'))
		await dispatch(setFailed(false, 'FETCH_PRODUCTS'))
		try {
			const response = await fetch(`${url}/products`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchProductsSuccess(data.data))
			await dispatch(setSuccess(false, 'FETCH_PRODUCTS'))
			await dispatch(setLoading(false, 'FETCH_PRODUCTS'))
		} catch (e) {
			await dispatch(setFailed(true, 'FETCH_PRODUCTS', e))
			await dispatch(setLoading(false, 'FETCH_PRODUCTS'))
		}
	}
}

const fetchProductsSuccess = data => {
	return {
		type: FETCH_PRODUCTS_SUCCESS,
		payload: data
	}
}
