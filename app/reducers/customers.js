import { FETCH_CUSTOMERS_SUCCESS, FILTER_CUSTOMERS_WITH_ID, FILTER_CUSTOMERS_WITH_NAME } from '../constants'

export const customers = (state = [], action) => {
  switch(action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
      return action.payload
    case FILTER_CUSTOMERS_WITH_ID:
      return state.filter(data => data.id === action.id_user)
    default:
      return state
  }
}