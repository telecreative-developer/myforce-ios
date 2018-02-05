import { FETCH_PRODUCTS_SUCCESS } from '../constants'

export const products = (state = [], action) => {
  switch(action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return action.payload
    default:
      return state
  }
}