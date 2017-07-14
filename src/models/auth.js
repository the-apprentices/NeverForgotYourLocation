import { ToastAndroid } from 'react-native'
import FBSDK from 'react-native-fbsdk'
import firebase from 'firebase'
const {
  LoginManager,
  AccessToken
} = FBSDK

export const getCurrentAuth = async (callback) => {
  try {
    let auth = new Promise(() => {
      firebase.auth().onAuthStateChanged((auth) => {
        callback(auth)
      })
    })
  } catch (error) {
    ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
  }
}
export const signOutWithFacebook = callback => {
  try {
    return firebase.auth().signOut()
  } catch (error) {
    ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
  }
}
export const signInWithFacebook = () => {
  return LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(async (loginInfo) => {
      if (loginInfo.isCancelled)
        ToastAndroid.show('Login action was canceled', ToastAndroid.LONG)
      else {
        const accessTokenData = await AccessToken.getCurrentAccessToken()
        const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
        firebase.auth().signInWithCredential(credential)
      }
    })
    .catch((error) => {
      ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
    })
}