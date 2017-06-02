import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableNativeFeedback
} from 'react-native'

const icons = {
  logo: require('./src/assets/imgs/logo.png'),
  facebook: require('./src/assets/imgs/facebook.png')
}

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  onButtonPress() {
    Alert.alert('Hihi')
  }
  onButtonSavePress(navigate) {
    setTimeout(() => {
      navigate('SaveLocation')
    }, 100)

  }
  onButtonVisitedPress(navigate) {
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
        <View style={styles.loginContainer}>
          <TouchableNativeFeedback
            onPress={this.onButtonPress}
            background={TouchableNativeFeedback.Ripple('#adadad', false)}>
            <View style={styles.loginContent}>
              <View style={styles.loginWrap}>
                <Image style={styles.loginIcon} source={icons.facebook} />
              </View>
              <View style={styles.loginLabel}>
                <Text style={styles.loginText}>
                  LOG IN WITH FACEBOOK
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.locationActionContainer}>
          <View style={styles.saveContainer}>
            <TouchableNativeFeedback
              onPress={() => this.onButtonSavePress(navigate)}
              background={TouchableNativeFeedback.Ripple('#adadad', false)}>
              <View style={styles.saveButton}>
                <Text style={styles.saveText}>
                  SAVE LOCATION
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.visitedContainer}>
            <TouchableNativeFeedback
              onPress={() => this.onButtonVisitedPress(navigate)}
              background={TouchableNativeFeedback.Ripple('#adadad', false)}>
              <View style={styles.visitedButton}>
                <Text style={styles.visitedText}>
                  VISITED PLACES
             </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
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
  loginContainer: {
    flex: 0.3,
    alignItems: 'center'
  },
  loginContent: {
    flexDirection: 'row',
    backgroundColor: '#43619D',
    justifyContent: 'center',
    height: 60,
    width: '80%'
  },
  loginWrap: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginIcon: {
    width: 30,
    height: 30,
  },
  loginLabel: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Regular',
    fontWeight: 'bold'
  },
  locationActionContainer: {
    flex: 0.4,
    justifyContent: 'center'
  },
  saveContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  saveButton: {
    height: 60,
    width: '80%',
    backgroundColor: '#FD482E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveText: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Regular',
    fontWeight: 'bold'
  },
  visitedContainer: {
    alignItems: 'center'
  },
  visitedButton: {
    height: 60,
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FD482E',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  visitedText: {
    color: '#FD482E',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Regular',
    fontWeight: 'bold'
  }
})