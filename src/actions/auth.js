import { LOADING, SIGN_IN, SIGN_OUT } from '../constants/ActionTypes'

export const loadingAuth = () => ({
  type: LOADING,
  auth: null
})
export const signIn = (auth) => ({
  type: SIGN_IN,
  auth: auth
})
export const signOut = () => ({
  type: SIGN_OUT,
  auth: null
})