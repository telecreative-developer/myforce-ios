import {
	SET_LOADING,
	SET_FAILED,
	SET_NAVIGATE,
	SET_ACTIVE_PAGE_HOME
} from '../constants'

const initialStateActivePageHome = {
	title: 'Activity',
	active: 3,
	activePageFirst: false,
	activePageSecond: false,
	activePageThird: true,
	activePageFourth: false,
	activePageFifth: false
}

export const loading = (state = [], action) => {
	switch (action.type) {
		case SET_LOADING:
			return action.payload
		default:
			return state
	}
}

export const failed = (state = [], action) => {
	switch (action.type) {
		case SET_FAILED:
			return action.payload
		default:
			return state
	}
}

export const navigate = (state = [], action) => {
	switch (action.type) {
		case SET_NAVIGATE:
			return action.payload
		default:
			return state
	}
}

export const activePageHome = (state = initialStateActivePageHome, action) => {
	switch (action.type) {
		case SET_ACTIVE_PAGE_HOME:
			return action.payload
		default:
			return state
	}
}
