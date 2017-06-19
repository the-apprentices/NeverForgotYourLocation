import React, { Component, PropTypes } from 'react'
import FBSDK from 'react-native-fbsdk'
import FacebookLoginButton from '../components/FacebookLoginButton'

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK
const infoRequest = new GraphRequest(
  '/me',
  null,
  this._responseInfoCallback,
);
_responseInfoCallback = function (error, result) {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
    console.warn('Success fetching data:' + JSON.stringify(result));
  }
}

export default class LoginWithFacebook extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    buttonWrapperStyle: PropTypes.number.isRequired
  }


  onLoginButtonPress() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.warn(JSON.stringify(data.accessToken.toString()))
            }
          )
          console.warn(JSON.stringify(result))
          console.warn('Login success with permissions: '
            + result.grantedPermissions.toString());
        }
        new GraphRequestManager().addRequest(infoRequest).start();
      },
      function (error) {
        alert('Login fail with error: ' + error);
      }
    );
  }

  render() {
    return (
      <FacebookLoginButton
        buttonWrapperStyle={this.props.buttonWrapperStyle}
        onButtonPress={this.onLoginButtonPress} />
    )
  }
}