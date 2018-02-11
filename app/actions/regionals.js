import { FETCH_REGIONALS_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const fetchRegionals = () => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_PRODUCTS'))
		try {
			const response = await fetch(`${url}/regionals`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
			const data = await response.json()
			await dispatch(fetchRegionalsSuccess(data.data))
			await dispatch(setSuccess(true, 'FETCH_PRODUCTS'))
			await dispatch(setLoading(true, 'FETCH_PRODUCTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FETCH_PRODUCTS', e))
			await dispatch(setLoading(true, 'FETCH_PRODUCTS'))
		}
	}
}

const fetchRegionalsSuccess = data => {
	return {
		type: FETCH_REGIONALS_SUCCESS,
		payload: data
	}
}
