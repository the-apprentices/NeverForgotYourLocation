import FBSDK from 'react-native-fbsdk'
import { authWithFirebase } from './connectWithFirebase'
const {
  LoginManager,
  AccessToken
} = FBSDK

export default signInWithFacebook = () => {
  return LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(async (loginInfo) => {
      if (loginInfo.isCancelled)
        throw Error()
      else {
        const accessTokenData = await AccessToken.getCurrentAccessToken()
        return authWithFirebase(accessTokenData.accessToken)
      }
    })
    .catch((error) => { throw Error() })
}