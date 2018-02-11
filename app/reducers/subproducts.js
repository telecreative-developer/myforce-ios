import { FETCH_SUBPRODUCTS_SUCCESS } from '../constants'

export const subproducts = (state = [], action) => {
	switch (action.type) {
		case FETCH_SUBPRODUCTS_SUCCESS:
			return action.payload
		default:
			return state
	}
}
