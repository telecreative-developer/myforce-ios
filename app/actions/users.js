import { FETCH_USERS_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { saveSessionForPersistance } from './session'
import { setLoading, setSuccess, setFailed } from './processor'

export const fetchUsers = accessToken => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_USERS'))
		try {
			const response = await fetch(`${url}/users`, {
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
			dispatch(setFailed(true, 'FETCH_USERS', e))
			dispatch(setLoading(false, 'FETCH_USERS'))
		}
	}
}

export const postAvatar = (id, avatar, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_POST_AVATAR'))
		try {
			const responseUploadAvatar = await fetch(`${url}/upload-avatar-user`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({ uri: avatar })
			})
			const dataUploadAvatar = await responseUploadAvatar.json()
			const responseUsers = await fetch(`${url}/users/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify({
					avatar: `${url}/files/users/avatars/${dataUploadAvatar.id}`
				})
			})
			const dataUsers = await responseUsers.json()
			const responseUserWithEmail = await fetch(
				`${url}/users?email=${dataUsers.email}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					}
				}
			)
			const dataUserWithEmail = await responseUserWithEmail.json()
			await dispatch(
				saveSessionForPersistance({ ...dataUserWithEmail.data[0], accessToken })
			)
			await dispatch(
				setSuccess(true, 'SUCCESS_POST_AVATAR', {
					...dataUserWithEmail.data[0]
				})
			)
			await dispatch(setLoading(false, 'LOADING_POST_AVATAR'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_POST_AVATAR', e))
			dispatch(setLoading(false, 'LOADING_POST_AVATAR'))
		}
	}
}

export const updateUser = (id, item, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'UPDATE_USER'))
		try {
			const response = await fetch(`${url}/users/${id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(item)
			})
			const data = await response.json()
			if (data.code === 400 && data.errors[0].path === 'username') {
				await dispatch(setFailed(true, 'UPDATE_USER', 'Username already used'))
				await dispatch(setLoading(false, 'UPDATE_USER'))
			} else if (data.code === 400 && data.errors[0].path === 'email') {
				await dispatch(setFailed(true, 'UPDATE_USER', 'Email already used'))
				await dispatch(setLoading(false, 'UPDATE_USER'))
			} else {
				await dispatch(setSuccess(true, 'UPDATE_USER'))
				await dispatch(setLoading(false, 'UPDATE_USER'))
			}
		} catch (e) {
			dispatch(setFailed(true, 'UPDATE_USER', e))
			dispatch(setLoading(false, 'UPDATE_USER'))
		}
	}
}

const fetchUsersSuccess = data => ({
	type: FETCH_USERS_SUCCESS,
	payload: data
})
