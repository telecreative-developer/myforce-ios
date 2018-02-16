import { ADD_PIC, REMOVE_PIC } from '../constants'
import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const postPICS = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_ADD_PIC'))
		try {
			await fetch(`${url}/pics`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				},
				body: JSON.stringify(data)
			})
			await dispatch(setSuccess(true, 'SUCCESS_ADD_PIC'))
			await dispatch(setLoading(false, 'LOADING_ADD_PIC'))
			await dispatch(setSuccess(false, 'SUCCESS_ADD_PIC'))
		} catch (e) {
			await dispatch(setFailed(true, 'FAILED_ADD_PIC', e))
			await dispatch(setLoading(false, 'LOADING_ADD_PIC'))
		}
	}
}

export const addPIC = (data) => ({
	type: ADD_PIC,
	payload: data
})

export const removePic = (data) => ({
	type: REMOVE_PIC,
	payload: data
})