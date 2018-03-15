import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from '../actions/processor'
import { FETCH_TARGET_SUCCESS } from '../constants'

export const fetchTarget = year => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_TARGET'))
		try {
			const response = await fetch(`${url}/targets?year=${year}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
			const data = await response.json()
			await dispatch(fetchTargetSuccess(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_TARGET'))
			await dispatch(setLoading(false, 'LOADING_FETCH_TARGET'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_TARGET', e))
			dispatch(setLoading(false, 'LOADING_FETCH_TARGET'))
		}
	}
}

const fetchTargetSuccess = data => ({
	type: FETCH_TARGET_SUCCESS,
	payload: data
})
