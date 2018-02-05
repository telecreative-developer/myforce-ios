import { FETCH_PRODUCTS_SUCCESS } from '../constants'
import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'

export const fetchProducts = (accessToken) => {
  return async (dispatch) => {
    await dispatch(setLoading({condition: true, process_on: 'fetch_products'}))
    try {
      const response = await fetch(`${url}/products`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      })
      const data = await response.json()
      await dispatch(fetchProductsSuccess(data.data))
      await dispatch(setLoading({condition: false, process_on: 'fetch_products'}))
      await dispatch(setFailed({condition: false, process_on: 'fetch_products'}))
    }catch(e) {
      await dispatch(setFailed({condition: true, process_on: 'fetch_products', message: e}))
      await dispatch(setLoading({condition: false, process_on: 'fetch_products'}))
    }
  }
}

const fetchProductsSuccess = (data) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data
  }
}