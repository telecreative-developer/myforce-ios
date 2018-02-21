import { FETCH_TARGET_SUCCESS } from '../constants'

export const target = (state = [], action) => {
	switch (action.type) {
		case FETCH_TARGET_SUCCESS:
			return action.payload
		default:
			return state
	}
}
