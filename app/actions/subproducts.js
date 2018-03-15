import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from '../actions/processor'
import { FETCH_SUBPRODUCTS_SUCCESS } from '../constants'

export const fetchSubproducts = (id, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'FETCH_SUBPRODUCTS'))
		await dispatch(setFailed(false, 'FETCH_SUBPRODUCTS'))
		try {
			const response = await fetch(`${url}/subproducts?id_product=${id}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: accessToken
				}
			})
			const data = await response.json()
			await dispatch(fetchSubproductsSuccess(data.data))
			await dispatch(setSuccess(true, 'FETCH_SUBPRODUCTS'))
			await dispatch(setLoading(false, 'FETCH_SUBPRODUCTS'))
		} catch (e) {
			dispatch(setFailed(true, 'FETCH_SUBPRODUCTS', e))
			dispatch(setLoading(false, 'FETCH_SUBPRODUCTS'))
		}
	}
}

const fetchSubproductsSuccess = data => ({
	type: FETCH_SUBPRODUCTS_SUCCESS,
	payload: data
})
