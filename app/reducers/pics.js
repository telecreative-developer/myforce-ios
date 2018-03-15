import {
	ADD_PIC,
	REMOVE_PIC,
	REMOVE_ALL_PIC,
	PICS_CUSTOMERS,
	FETCH_PICS_SUCCESS
} from '../constants'

export const pics = (state = [], action) => {
	switch (action.type) {
		case ADD_PIC:
			return [...state, action.payload]
		case REMOVE_PIC:
			return state.filter(data => data.pic_id !== action.payload.pic_id)
		case REMOVE_ALL_PIC:
			return action.payload
		default:
			return state
	}
}

export const resultPics = (state = [], action) => {
	switch (action.type) {
		case FETCH_PICS_SUCCESS:
			return action.payload
		default:
			return state
	}
}

export const picsCustomers = (state = [], action) => {
	switch (action.type) {
		case PICS_CUSTOMERS:
			return action.payload
		default:
			return state
	}
}
