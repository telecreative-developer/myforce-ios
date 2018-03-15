import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../constants'

export const cartProducts = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT_TO_CART:
			return [...state, action.payload]
		case REMOVE_PRODUCT_FROM_CART:
			return state.filter(data => data.id_index !== action.id_index)
		default:
			return state
	}
}
