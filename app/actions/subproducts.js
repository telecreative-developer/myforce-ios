import { url } from '../lib/server'
import { setLoading, setFailed } from '../actions/processor'
import { FETCH_SUBPRODUCTS_SUCCESS } from '../constants'

export const fetchSubproducts = (id, accessToken) => {
  return async (dispatch) => {
    await dispatch(setLoading({condition: true, process_on: 'fetch_subproducts'}))
    try {
      const response = await fetch(`${url}/subproducts?id_product=${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      })
      const data = await response.json()
      await dispatch(fetchSubproductsSuccess(data.data))
      await dispatch(setLoading({condition: false, process_on: 'fetch_subproducts'}))
      await dispatch(setFailed({condition: false, process_on: 'fetch_subproducts'}))
    }catch(e) {
      await dispatch(setFailed({condition: true, process_on: 'fetch_subproducts', message: e}))
      await dispatch(setLoading({condition: false, process_on: 'fetch_subproducts'}))
    }
  }
}

const fetchSubproductsSuccess = (data) => {
  return {
    type: FETCH_SUBPRODUCTS_SUCCESS,
    payload: data
  }
}