import { FETCH_USERS_SUCCESS, GET_USER_REGION_RANK, GET_USER_NATION_RANK } from '../constants'

export const users = (state = [], action) => {
  switch(action.type) {
    case FETCH_USERS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export const userRegionRank = (state = [], action) => {
  switch(action.type) {
    case GET_USER_REGION_RANK:
      return action.payload.filter(i => i.id_region === action.id_region)
    default:
      return state
  }
}

export const userNationRank = (state = [], action) => {
  switch(action.type) {
    case GET_USER_NATION_RANK:
      return action.payload.findIndex(i => i.id === action.id_user) + 1
    default:
      return state
  }
}