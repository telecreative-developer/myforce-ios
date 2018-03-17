import { FETCH_DATA_CHECK_IN } from '../constants'

export const checks = (state = [], action) => {
	switch (action.type) {
		case FETCH_DATA_CHECK_IN:
			return action.payload
		default:
			return state
	}
}