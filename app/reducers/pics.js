import { RECEIVE_PICS_SUCCESS } from '../constants'

export const pics = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_PICS_SUCCESS:
			return action.payload
		default:
			return state
	}
}
