import { FETCH_FETCH_EVENTS_SUCCESS } from '../constants'

export const events = (state = [], action) => {
	switch (action.type) {
		case FETCH_FETCH_EVENTS_SUCCESS:
			return action.payload
		default:
			return state
	}
}
