import { FETCH_SELLING_PROCESS_WITH_STEP_SUCCESS } from '../constants'

export const sellingProcessWithStep = (state = [], action) => {
	switch (action.type) {
		case FETCH_SELLING_PROCESS_WITH_STEP_SUCCESS:
			return action.payload
		default:
			return state
	}
}