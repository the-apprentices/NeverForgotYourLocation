import { loadingAuth, signIn, signOut } from './auth'
import * as handleAuthentication from '../models/auth'

export const loadingState = () => dispatch => {
  dispatch(loadingAuth())
}
export const getCurrentAuth = () => dispatch => {
  handleAuthentication.getCurrentAuth(auth => {
    if (auth)
      dispatch(signIn(auth))
    else
      dispatch(signOut())

  })
}
export const signInWithFacebook = () => dispatch => {
  handleAuthentication.signInWithFacebook()
}
export const signOutWithFacebook = () => dispatch => {
  handleAuthentication.signOutWithFacebook(() => {
    dispatch(signOut())
  })
}