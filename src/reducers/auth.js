import { LOADING, SIGN_IN, SIGN_OUT } from '../constants/ActionTypes'

const initialAuthState = {
  isLoading: true,
  auth: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        isLoading: true,
        auth: action.auth
      }
    case SIGN_IN:
      return {
        isLoading: false,
        auth: action.auth
      }
    case SIGN_OUT:
      return {
        isLoading: false,
        auth: action.auth
      }
    default:
      return state
  }
}