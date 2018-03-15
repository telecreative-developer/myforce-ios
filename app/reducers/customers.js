import {
	FETCH_CUSTOMERS_SUCCESS,
	FILTER_CUSTOMERS_WITH_ID,
	FILTER_CUSTOMERS_WITH_NAME,
	RECEIVE_CUSTOMER_PLACES,
	INPUT_DATA_TO_CUSTOMER
} from '../constants'

export const customers = (state = [], action) => {
	switch (action.type) {
		case FETCH_CUSTOMERS_SUCCESS:
			return action.payload
		case FILTER_CUSTOMERS_WITH_ID:
			return state.filter(data => data.id === action.id_user)
		case INPUT_DATA_TO_CUSTOMER:
			return [...state, action.payload]
		default:
			return state
	}
}

export const resultCustomersPlace = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_CUSTOMER_PLACES:
			return action.payload
		default:
			return state
	}
}
