import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'

import FacebookLoginButton from '../components/FacebookLoginButton'
import SaveButton from '../components/SaveLocationButton'
import ViewPlacesButton from '../components/ViewPlacesButton'
const icons = {
  logo: require('../assets/imgs/logo.png')
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

const HomeScreen = ({ auth, dispatch, navigation }) => (
  <View style={styles.mainContainer}>
    <View style={styles.logoContainer}>
      <Image source={icons.logo} />
    </View>
    <FacebookLoginButton style={styles.loginButtonWrapper}
      auth={auth}
      dispatch={dispatch} />
    <View style={styles.mainActionContainer}>
      <SaveButton style={styles.saveButtonWrapper}
        navigation={navigation} />
      <ViewPlacesButton navigation={navigation} />
    </View>
  </View>
)
HomeScreen.navigationOptions = {
  header: null
}
HomeScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(HomeScreen)