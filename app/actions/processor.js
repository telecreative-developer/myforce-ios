import { SET_LOADING, SET_FAILED, SET_NAVIGATE, SET_ACTIVE_PAGE_HOME } from '../constants'

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading
  }
}

export const setFailed = (failed) => {
  return {
    type: SET_FAILED,
    payload: failed
  }
}

export const setNavigate = (navigate) => {
  return {
    type: SET_NAVIGATE,
    payload: navigate
  }
}

export const setActivePageHome = (activePageHome) => {
  return {
    type: SET_ACTIVE_PAGE_HOME,
    payload: activePageHome
  }
}

