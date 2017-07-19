import { loadingAuth, signIn, signOut } from './auth'
import { receiveLocations, addLocation } from './locations'
import * as handleAuthentication from '../models/auth'
import * as handleLocations from '../models/locations'

export const loadingAuthState = () => dispatch => {
  dispatch(loadingAuth())
}
export const getCurrentAuth = () => dispatch => {
  handleAuthentication.getCurrentAuth(auth => {
    if (auth) {
      dispatch(signIn(auth))
      dispatch(getLocations(auth.uid))
    }
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
export const getLocations = (userId) => dispatch => {
  handleLocations.getLocations(userId, (locations) => {
    dispatch(receiveLocations(locations))
  })
}
export const storeLocation = (uid, coordinate, title, description) => dispatch => {
  handleLocations.saveLocation({uid, coordinate, title, description}, (location) => {
    dispatch(addLocation(location))
  })
}