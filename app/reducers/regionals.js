import { FETCH_REGIONALS_SUCCESS } from '../constants'

export const regionals = (state = [], action) => {
  switch(action.type) {
    case FETCH_REGIONALS_SUCCESS:
      return action.payload
    default:
      return state
  }
}