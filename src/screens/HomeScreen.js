import React, { Component } from 'react'
import { StyleSheet, View, Image, ToastAndroid } from 'react-native'
import {
  signInWithFacebook,
  getCurrentUser,
  signOut
} from '../helpers/handleFacebookAcount'
import FacebookLoginButton from '../containers/LoginWithFacebook'
import SaveButton from '../containers/DispatchSaveLocation'
import ViewPlacesButton from '../containers/ViewPlaces'

const icons = {
  logo: require('../assets/imgs/logo.png')
}

export default class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.currentUser = null
    this.state = {
      buttonText: 'Loading ...'
    }
  }
  static navigationOptions = {
    header: null
  }

  updateButtonInfo = async () => {
    this.currentUser = await getCurrentUser()
    const buttonText = this.currentUser ? `Hi, ${this.currentUser.displayName}`
      : 'LOG IN WITH FACEBOOK'
    this.setState({ buttonText })
  }
  onLoginAction = async () => {
    this.setState({ buttonText: 'Loading ...' })
    try {
      await signInWithFacebook()
      this.updateButtonInfo()
    } catch (error) {
      this.setState({ buttonText: 'LOG IN WITH FACEBOOK' })
      ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
    }
  }
  onLogoutAction = async () => {
    this.setState({ buttonText: 'Loading ...' })
    await signOut()
    this.updateButtonInfo()
  }
  onLoginButtonPress() {
    if (this.currentUser)
      this.onLogoutAction()
    else
      this.onLoginAction()
  }
  onSaveButtonPress(navigate) {
    setTimeout(() => {
      navigate('SaveLocation', { isSavingState: false, currentUser: this.currentUser })
    }, 100)
  }
  onViewButtonPress(navigate) {
    setTimeout(() => {
      navigate('VisitedLocations', { currentUser: this.currentUser })
    }, 100)
  }

  componentWillMount() {
    this.updateButtonInfo()
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={icons.logo} />
        </View>
        <FacebookLoginButton
          buttonWrapperStyle={styles.loginButtonWrapper}
          buttonText={this.state.buttonText}
          onButtonPress={() => this.onLoginButtonPress()} />
        <View style={styles.mainActionContainer}>
          <SaveButton
            buttonWrapperStyle={styles.saveButtonWrapper}
            onButtonPress={() => this.onSaveButtonPress(navigate)} />
          <ViewPlacesButton
            navigate={navigate}
            onButtonPress={() => this.onViewButtonPress(navigate)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F5F6'
  },
  logoContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButtonWrapper: {
    flex: 0.3
  },
  mainActionContainer: {
    flex: 0.4,
    justifyContent: 'center'
  },
  saveButtonWrapper: {
    marginBottom: 15
  }
})