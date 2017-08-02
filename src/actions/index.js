import { loadingAuth, signIn, signOut } from './auth'
import { receiveLocations } from './locations'
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
export const storeLocation = (userId, coordinate, title, description) => dispatch => {
  handleLocations.saveLocation({ userId, coordinate, title, description })
}
export const deleteLocation = (userId, markerKey) => dispatch => {
  handleLocations.invisibleLocation({ userId, markerKey })
}
export const editLocation = (userId, markerKey, title, description) => dispatch => {
  handleLocations.editLocation({ userId, markerKey, title, description })
}