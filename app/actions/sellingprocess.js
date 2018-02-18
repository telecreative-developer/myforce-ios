import { FETCH_SELLING_PROCESS_WITH_STEP_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const fetchSellingProcessWithStep = (step, accessToken) => {
  return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SELLING_PROCESS_WITH_STEP'))
		try {
			const response = await fetch(
				`${url}/selling-process?step=${step}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					}
				}
			)
			const data = await response.json()
			await dispatch(fetchSellingProcessWithStepSuccess(data.data[0]))
			await dispatch(setSuccess(true, 'SUCCESS_SELLING_PROCESS_WITH_STEP'))
			await dispatch(setLoading(false, 'LOADING_SELLING_PROCESS_WITH_STEP'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_SELLING_PROCESS_WITH_STEP', e))
			dispatch(setLoading(false, 'LOADING_SELLING_PROCESS_WITH_STEP'))
		}
	}
}

export const fetchSellingProcessWithStepSuccess = (data) => ({
  type: FETCH_SELLING_PROCESS_WITH_STEP_SUCCESS,
  payload: data
})