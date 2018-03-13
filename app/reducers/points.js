import { RECEIVED_POINTS } from '../constants'

export const points = (state = [], action) => {
	switch (action.type) {
		case RECEIVED_POINTS:
			return action.payload
		default:
			return state
	}
}