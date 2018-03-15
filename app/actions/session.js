import { SAVE_SESSION_FOR_PERSISTANCE } from '../constants'
import { AsyncStorage } from 'react-native'

export const saveSessionForLocal = sessionToLocal => {
	return dispatch => {
		AsyncStorage.setItem('session', JSON.stringify(sessionToLocal))
	}
}

export const saveSessionForPersistance = sessionToPersistance => ({
	type: SAVE_SESSION_FOR_PERSISTANCE,
	payload: sessionToPersistance
})
