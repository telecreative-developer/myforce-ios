import { ADD_PIC, REMOVE_PIC } from '../constants'

export const pics = (state = [], action) => {
	switch (action.type) {
		case ADD_PIC:
			return [
				...state,
				action.payload
			]
		case REMOVE_PIC:
			return state.filter(data => data.id_pic !== action.payload.id_pic)
		default:
			return state
	}
}
