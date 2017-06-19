import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import FacebookLoginButton from '../containers/LoginWithFacebook'
import SaveButton from '../containers/DispatchSaveLocation'
import ViewPlacesButton from '../containers/ViewPlaces'

const icons = {
  logo: require('../assets/imgs/logo.png')
}

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }

  onSaveButtonPress(navigate) {
    setTimeout(() => {
      navigate('SaveLocation', { isSavingState: false })
    }, 100)
  }
  onViewButtonPress(navigate) {
    setTimeout(() => {
      navigate('VisitedLocations')
    }, 100)
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={icons.logo} />
        </View>
        <FacebookLoginButton
          buttonWrapperStyle={styles.loginButtonWrapper} />
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