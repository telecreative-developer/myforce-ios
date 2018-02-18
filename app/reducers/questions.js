import { FETCH_QUESTION_WITH_STEP_SUCCESS } from '../constants'

export const questionWithStep = (state = [], action) => {
	switch (action.type) {
		case FETCH_QUESTION_WITH_STEP_SUCCESS:
			return action.payload
		default:
			return state
	}
}