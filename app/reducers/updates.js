import { FETCH_FETCH_TEAM_UPDATES_WITH_BRANCH_SUCCESS } from '../constants'

export const teamUpdatesWithBranch = (state = [], action) => {
	switch (action.type) {
		case FETCH_FETCH_TEAM_UPDATES_WITH_BRANCH_SUCCESS:
			return action.payload
		default:
			return state
	}
}
