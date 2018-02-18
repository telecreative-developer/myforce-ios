import { FETCH_QUESTION_WITH_STEP_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const fetchQuestionWithStep = (step, accessToken) => {
  return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_QUESTION_WITH_STEP'))
		try {
			const response = await fetch(
				`${url}/questions?step=${step}`,
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
			await dispatch(fetchQuestionsSuccess(data.data[0]))
			await dispatch(setSuccess(false, 'SUCCESS_FETCH_QUESTION_WITH_STEP'))
			await dispatch(setLoading(false, 'LOADING_FETCH_QUESTION_WITH_STEP'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_QUESTION_WITH_STEP', e))
			dispatch(setLoading(false, 'LOADING_FETCH_QUESTION_WITH_STEP'))
		}
	}
}

export const fetchQuestionsSuccess = (data) => ({
  type: FETCH_QUESTION_WITH_STEP_SUCCESS,
  payload: data
})