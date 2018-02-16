import { FETCH_PIPELINES_SUCCESS, FETCH_PIPELINES_WITH_USER_ID_SUCCESS } from '../constants'

export const pipelines = (state = [], action) => {
	switch (action.type) {
		case FETCH_PIPELINES_SUCCESS:
			return action.payload
		default:
			return state
	}
}

export const pipelinesWithUserId = (state = [], action) => {
	switch (action.type) {
		case FETCH_PIPELINES_WITH_USER_ID_SUCCESS:
			return action.payload
		default:
			return state
	}
}
