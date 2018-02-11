import {
	FETCH_USERS_SUCCESS,
	GET_USER_REGION_RANK,
	GET_USER_NATION_RANK
} from '../constants'
import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'

export const fetchUsers = accessToken => {
	return async dispatch => {
		await dispatch(setLoading({ condition: true, process_on: 'fetch_users' }))
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
			await dispatch(
				setLoading({ condition: false, process_on: 'fetch_users' })
			)
		} catch (e) {
			await dispatch(
				setFailed({ condition: true, process_on: 'fetch_users', message: e })
			)
			await dispatch(
				setLoading({ condition: false, process_on: 'fetch_users' })
			)
		}
	}
}

export const updateUser = (id, data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading({ condition: true, process_on: 'update_user' }))
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
			await dispatch(
				setLoading({ condition: false, process_on: 'update_user' })
			)
		} catch (e) {
			await dispatch(
				setFailed({ condition: true, process_on: 'update_user', message: e })
			)
			await dispatch(
				setLoading({ condition: false, process_on: 'update_user' })
			)
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
