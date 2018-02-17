import { FETCH_PIPELINES_SUCCESS, FETCH_PIPELINES_WITH_USER_ID_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { app } from '../lib/socket'

export const postPipeline = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'POST_PIPELINE'))
		try {
			await fetch(`${url}/pipelines`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(fetchPipelines(data.id_customer, accessToken))
			await dispatch(setSuccess(false, 'POST_PIPELINE'))
			await dispatch(setLoading(false, 'POST_PIPELINE'))
		} catch (e) {
			await dispatch(setFailed(true, 'POST_PIPELINE', e))
			await dispatch(setLoading(false, 'POST_PIPELINE'))
		}
	}
}

export const fetchPipelines = (id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_PIPELINES'))
		try {
			const response = await fetch(
				`${url}/pipelines?id_customer=${id}&$sort[createdAt]=-1`,
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
			await dispatch(fetchPipelinesSuccess(data.data))
			await dispatch(setSuccess(false, 'FETCH_PIPELINES'))
			await dispatch(setLoading(false, 'FETCH_PIPELINES'))
		} catch (e) {
			await dispatch(setFailed(true, 'FETCH_PIPELINES', e))
			await dispatch(setLoading(false, 'FETCH_PIPELINES'))
		}
	}
}

export const fetchPipelinesWithUserId = (id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_PIPELINES_WITH_USER_ID'))
		try {
			const response = await fetch(
				`${url}/pipelines?id=${id}&$sort[createdAt]=-1`,
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
			await dispatch(fetchPipelinesWithUserIdSuccess(data.data))
			await dispatch(setSuccess(false, 'SUCCESS_FETCH_PIPELINES_WITH_USER_ID'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PIPELINES_WITH_USER_ID'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_FETCH_PIPELINES_WITH_USER_ID', e))
			await dispatch(setLoading(false, 'LOADING_FETCH_PIPELINES_WITH_USER_ID'))
		}
	}
}

export const fetchPipelinesRealtime = (id, accessToken) => {
	return async dispatch => {
		const pipelines = await app.service('pipelines')
		await pipelines.on('created', () =>
			dispatch(fetchPipelines(id, accessToken))
		)
		await pipelines.on('removed', () =>
			dispatch(fetchPipelines(id, accessToken))
		)
	}
}

export const fetchPipelinesSuccess = data => {
	return {
		type: FETCH_PIPELINES_SUCCESS,
		payload: data
	}
}

export const fetchPipelinesWithUserIdSuccess = data => {
	return {
		type: FETCH_PIPELINES_WITH_USER_ID_SUCCESS,
		payload: data
	}
}
