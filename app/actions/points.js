import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { RECEIVED_POINTS } from '../constants'

export const fetchPoints = accessToken => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_FETCH_POINTS'))
		try {
			const response = await fetch(`${url}/points`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			const result = await [
				...data.data
					.reduce((mp, o) => {
						if (!mp.has(o.id)) {
							mp.set(o.id, {
								point: data.data
									.filter(d => d.id === o.id)
									.map(d => d.point)
									.reduce((x, y) => x + y),
								id_branch: o.id_branch,
								users: o.users
							})
						}
						return mp
					}, new Map())
					.values()
			]
			await dispatch(receivedPoints(result))
			await dispatch(setSuccess(true, 'SUCCESS_FETCH_POINTS'))
			await dispatch(setLoading(false, 'LOADING_FETCH_POINTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_FETCH_POINTS', e))
			dispatch(setLoading(false, 'LOADING_FETCH_POINTS'))
		}
	}
}

const receivedPoints = data => ({
	type: RECEIVED_POINTS,
	payload: data
})

export const addPoint = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_ADD_POINT'))
		try {
			await fetch(`${url}/points`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(setSuccess(true, 'SUCCESS_ADD_POINT'))
			await dispatch(setLoading(false, 'LOADING_ADD_POINT'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_ADD_POINT', e))
			dispatch(setLoading(false, 'LOADING_ADD_POINT'))
		}
	}
}
