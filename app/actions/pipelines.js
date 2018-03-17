import {
	FETCH_PIPELINES_SUCCESS,
	FETCH_PIPELINES_WITH_USER_ID_SUCCESS,
	FETCH_PIPELINE_PRODUCTS_SUCCESS
} from '../constants'
import { url } from '../lib/server'
import moment from 'moment'
import { sendUpdate } from './updates'
import { setLoading, setSuccess, setFailed } from './processor'
import { app } from '../lib/socket'

export const postPipeline = (item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'POST_PIPELINE'))
		try {
			const response = await fetch(`${url}/pipelines`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({
					...item,
					year: moment().format('YYYY'),
					month: moment().format('MM')
				})
			})
			const data = await response.json()
			await dispatch(
				sendUpdate({ ...item, id_pipeline: data.id_pipeline }, accessToken)
			)
			await dispatch(fetchPipelines(item.id_customer, accessToken))
			await dispatch(setSuccess(false, 'POST_PIPELINE'))
			await dispatch(setLoading(false, 'POST_PIPELINE'))
		} catch (e) {
			dispatch(setFailed(true, 'POST_PIPELINE', e))
			dispatch(setLoading(false, 'POST_PIPELINE'))
		}
	}
}

export const fetchPipelines = (id_customer, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_PIPELINES'))
		try {
			const response = await fetch(
				`${url}/pipelines?id_customer=${id_customer}&$sort[createdAt]=-1`,
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
			dispatch(setFailed(true, 'FETCH_PIPELINES', e))
			dispatch(setLoading(false, 'FETCH_PIPELINES'))
		}
	}
}

export const fetchPipelinesSuccess = data => ({
	type: FETCH_PIPELINES_SUCCESS,
	payload: data
})

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
			dispatch(setFailed(true, 'FAILED_FETCH_PIPELINES_WITH_USER_ID', e))
			dispatch(setLoading(false, 'LOADING_FETCH_PIPELINES_WITH_USER_ID'))
		}
	}
}

export const fetchPipelinesWithUserIdSuccess = data => ({
	type: FETCH_PIPELINES_WITH_USER_ID_SUCCESS,
	payload: data
})

export const fetchPipelineProducts = (id_pipeline, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_PIPELINE_PRODUCTS'))
		try {
			const response = await fetch(`${url}/pipeline-products?id_pipeline=${id_pipeline}&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchPipelineProductsSuccess(data.data))
			await dispatch(setSuccess(false, 'SUCCESS_FETCH_PIPELINE_PRODUCTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_PIPELINE_PRODUCTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_PIPELINE_PRODUCTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_PIPELINE_PRODUCTS'))
		}
	}
}

export const fetchPipelineProductsSuccess = data => ({
	type: FETCH_PIPELINE_PRODUCTS_SUCCESS,
	payload: data
})