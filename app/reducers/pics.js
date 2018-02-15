import { RECEIVE_PICS_SUCCESS, CHOOSE_PIC } from '../constants'

export const pics = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_PICS_SUCCESS:
			return action.payload
		case CHOOSE_PIC:
			return [
				...state.filter(data => data.id_pic !== action.payload.id_pic),
				action.payload
			]
		default:
			return state
	}
}
