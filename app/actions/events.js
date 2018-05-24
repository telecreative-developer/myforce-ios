import { FETCH_FETCH_EVENTS_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const postEvent = (item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_POST_EVENT'))
		try {
			await fetch(`${url}/events`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(item)
			})
			await dispatch(fetchEvents(item.id, accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_POST_EVENT'))
			await dispatch(setLoading(false, 'LOADING_POST_EVENT'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_POST_EVENT', e))
			dispatch(setLoading(false, 'LOADING_POST_EVENT'))
		}
	}
}

export const updateEvent = (id_event, item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_POST_EVENT'))
		try {
			await fetch(`${url}/events?id_event=${id_event}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(item)
			})
			await dispatch(fetchEvents(item.id, accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_POST_EVENT'))
			await dispatch(setLoading(false, 'LOADING_POST_EVENT'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_POST_EVENT', e))
			dispatch(setLoading(false, 'LOADING_POST_EVENT'))
		}
	}
}

export const deleteEvent = (id_event, id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_DELETE_EVENT'))
		try {
			await fetch(`${url}/events?id_event=${id_event}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			await dispatch(fetchEvents(id, accessToken))
			await dispatch(setSuccess(true, 'SUCCESS_DELETE_EVENT'))
			await dispatch(setLoading(false, 'LOADING_DELETE_EVENT'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_DELETE_EVENT', e))
			dispatch(setLoading(false, 'LOADING_DELETE_EVENT'))
		}
	}
}

export const fetchEvents = (id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_EVENTS'))
		try {
			const response = await fetch(`${url}/events?id=${id}&$sort[createdAt]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchEventsSuccess(data.data))
			await dispatch(setSuccess(false, 'SUCCESS_FETCH_EVENTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_EVENTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_EVENTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_EVENTS'))
		}
	}
}

export const fetchEventsSuccess = data => ({
	type: FETCH_FETCH_EVENTS_SUCCESS,
	payload: data
})
