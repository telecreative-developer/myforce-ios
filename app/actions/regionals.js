import { FETCH_REGIONALS_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setFailed } from './processor'

export const fetchRegionals = () => {
	return async dispatch => {
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
		} catch (e) {
			dispatch(
				setFailed({
					condition: true,
					process_on: 'fetch_regionals',
					message: e
				})
			)
		}
	}
}

const fetchRegionalsSuccess = data => {
	return {
		type: FETCH_REGIONALS_SUCCESS,
		payload: data
	}
}
