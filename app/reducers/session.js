import { SAVE_SESSION_FOR_PERSISTANCE } from '../constants'

export const sessionPersistance = (state = [], action) => {
	switch (action.type) {
		case SAVE_SESSION_FOR_PERSISTANCE:
			return action.payload
		default:
			return state
	}
}
