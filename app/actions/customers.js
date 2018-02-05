import { FETCH_CUSTOMERS_SUCCESS, FILTER_CUSTOMERS_WITH_ID } from '../constants'
import { url } from '../lib/server'
import { setLoading, setFailed } from './processor'

export const fetchCustomers = (accessToken) => {
  return async (dispatch) => {
    await dispatch(setLoading({condition: true, process_on: 'fetch_customers'}))
    await dispatch(setFailed({condition: false, process_on: 'fetch_customers', message: ''}))
    try {
      const response = await fetch(`${url}/customers`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      })
      const data = await response.json()
      await dispatch(fetchCustomersSuccess(data.data))
      await dispatch(setLoading({condition: false, process_on: 'fetch_customers'}))
    }catch(e) {
      await dispatch(setFailed({condition: true, process_on: 'fetch_customers', message: 'Failed get data customers'}))
      await dispatch(setLoading({condition: false, process_on: 'fetch_customers'}))
    }
  }
}

const fetchCustomersSuccess = (data) => {
  return {
    type: FETCH_CUSTOMERS_SUCCESS,
    payload: data
  }
}

export const filterCustomersWithId = (id) => {
  return {
    type: FILTER_CUSTOMERS_WITH_ID,
    id_user: id
  }
}