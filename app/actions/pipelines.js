import { FETCH_PIPELINES_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'
import { app } from '../lib/socket'

export const postPipeline = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading({ condition: true, process_on: 'post_pipeline' }))
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
			await dispatch(
				setLoading({ condition: false, process_on: 'post_pipeline' })
			)
		} catch (e) {
			await dispatch(
				setFailed({ condition: true, process_on: 'post_pipeline', message: e })
			)
			await dispatch(
				setLoading({ condition: false, process_on: 'post_pipeline' })
			)
		}
	}
}

export const fetchPipelines = (id, accessToken) => {
	return async dispatch => {
		await dispatch(
			setLoading({ condition: true, process_on: 'fetch_pipelines' })
		)
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
			await dispatch(
				setLoading({ condition: false, process_on: 'fetch_pipelines' })
			)
		} catch (e) {
			await dispatch(
				setFailed({
					condition: true,
					process_on: 'fetch_pipelines',
					message: e
				})
			)
			await dispatch(
				setLoading({ condition: false, process_on: 'fetch_pipelines' })
			)
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
