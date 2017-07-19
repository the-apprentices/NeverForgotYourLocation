import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native'
import { loadingAuthState, signInWithFacebook, signOutWithFacebook } from '../actions'
const icons = {
  facebook: require('../assets/imgs/facebook.png')
}
const styles = StyleSheet.create({
  buttonWrapperStyle: {
    alignItems: 'center'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    width: '80%',
    backgroundColor: '#43619D'
  },
  iconContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContent: {
    width: 30,
    height: 30,
  },
  buttonContentStyle: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Regular',
    fontWeight: 'normal'
  }
})

const onButtonPress = (auth, dispatch) => {
  if (auth)
    dispatch(signOutWithFacebook())
  else {
    dispatch(loadingAuthState())
    dispatch(signInWithFacebook())
  }
}
const FacebookLoginButton = ({ style, auth, dispatch }) => {
  let buttonText
  if (auth.isLoading) buttonText = 'Loading ...'
  else if (auth.auth) buttonText = `Hi, ${auth.auth.displayName}`
  else buttonText = 'SIGN IN WITH FACEBOOK'
  return (
    <View style={[styles.buttonWrapperStyle, style]}>
      <TouchableNativeFeedback
        onPress={() => onButtonPress(auth.auth, dispatch)}
        background={TouchableNativeFeedback.Ripple('#adadad', false)}>
        <View style={styles.buttonContainerStyle}>
          <View style={styles.iconContainer}>
            <Image style={styles.iconContent} source={icons.facebook} />
          </View>
          <View style={styles.buttonContentStyle}>
            <Text style={styles.buttonTextStyle}>
              {buttonText}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}
FacebookLoginButton.propTypes = {
  style: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default FacebookLoginButton