import { FETCH_PIPELINES_SUCCESS } from '../constants'

export const pipelines = (state = [], action) => {
	switch (action.type) {
		case FETCH_PIPELINES_SUCCESS:
			return action.payload
		default:
			return state
	}
}
