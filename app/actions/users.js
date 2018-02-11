import {
	FETCH_USERS_SUCCESS,
	GET_USER_REGION_RANK,
	GET_USER_NATION_RANK
} from '../constants'
import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'

export const fetchUsers = accessToken => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_USERS'))
		try {
			const response = await fetch(`${url}/users?$sort[point]=-1`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchUsersSuccess(data.data))
			await dispatch(setSuccess(true, 'FETCH_USERS'))
			await dispatch(setLoading(false, 'FETCH_USERS'))
		} catch (e) {
			await dispatch(setFailed(true, 'FETCH_USERS', e))
			await dispatch(setLoading(false, 'FETCH_USERS'))
		}
	}
}

export const updateUser = (id, data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'UPDATE_USER'))
		try {
			await fetch(`${url}/users/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(setSuccess(true, 'UPDATE_USER'))
			await dispatch(setLoading(false, 'UPDATE_USER'))
		} catch (e) {
			await dispatch(setFailed(true, 'UPDATE_USER', e))
			await dispatch(setLoading(false, 'UPDATE_USER'))
		}
	}
}

const fetchUsersSuccess = data => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: data
	}
}

export const getUserRegionRank = (data, id_region) => {
	return {
		type: GET_USER_REGION_RANK,
		id_region: id_region,
		payload: data
	}
}

export const getUserNationRank = (data, id_user) => {
	return {
		type: GET_USER_NATION_RANK,
		id_user: id_user,
		payload: data
	}
}
