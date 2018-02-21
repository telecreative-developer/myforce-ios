import { url } from '../lib/server'
import { setLoading, setSuccess, setFailed } from './processor'
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../constants'

const initialIndex = 1

export const addProductToCart = (data) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: {
    id_index: initialIndex++,
    ...data
  }
})

export const removeProductFromCart = (id_index) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  id_index
})

export const sendProductsOnCart = (data, accessToken) => {
	return async dispatch => {
		await dispatch(setLoading(true, 'LOADING_SEND_PRODUCTS_ON_CART'))
		try {
			await fetch(
				`${url}/pipelines?id_pipeline=${data.id_pipeline}`,
				{
					method: 'PATCH',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					},
					body: JSON.stringify({
						total: data.total
					})
				}
			)
			await fetch(
				`${url}/pipeline-products`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: accessToken
					},
					body: JSON.stringify(data)
				}
			)
			await dispatch(setSuccess(true, 'SUCCESS_SEND_PRODUCTS_ON_CART'))
			await dispatch(setLoading(false, 'LOADING_SEND_PRODUCTS_ON_CART'))
		} catch (e) {
			dispatch(setFailed(true, 'FAILED_SEND_PRODUCTS_ON_CART', e))
			dispatch(setLoading(false, 'LOADING_SEND_PRODUCTS_ON_CART'))
		}
	}
}