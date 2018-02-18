import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const postAnswer = (item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_POST_ANSWER'))
		try {
			await fetch(`${url}/answers`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(item)
			})
			const responsePipelines = await fetch(`${url}/pipelines?id_pipeline=${item.id_pipeline}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({step: item.step+1, step_process: true})
			})
			const dataPipelines = await responsePipelines.json()
			const response = await fetch(`${url}/customers?id_customer=${dataPipelines[0].id_customer}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(setSuccess(true, 'SUCCESS_POST_ANSWER', data.data[0]))
			await dispatch(setLoading(false, 'LOADING_POST_ANSWER'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_POST_ANSWER', e))
			await dispatch(setLoading(false, 'LOADING_POST_ANSWER'))
		}
	}
}