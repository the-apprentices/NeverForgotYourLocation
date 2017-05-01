import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity
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
    navigate('SaveLocation')
  }
  render() {
    const { navigate } = this.props.navigation
    return (
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <Image source={icons.logo} />
          </View>
          <View style={styles.loginContainer}>
            <TouchableOpacity style={styles.loginButton}
              onPress={this.onButtonPress}>
              <View style={styles.loginContent}>
                <View style={styles.loginIcon}>
                  <Image source={icons.facebook} />
                </View>
                <View style={styles.loginLabel}>
                  <Text style={styles.loginText}>
                    LOG IN WITH FACEBOOK
                </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.locationActionContainer}>
            <View style={styles.saveContainer}>
              <TouchableOpacity style={styles.saveButton}
                onPress={() => this.onButtonSavePress(navigate)}>
                <Text style={styles.saveText}>
                  SAVE LOCATION
             </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.visitContainer}>
              <TouchableOpacity style={styles.visitButton}
                onPress={this.onButtonPress}>
                <Text style={styles.visitText}>
                  VISITED PLACES
             </Text>
              </TouchableOpacity>
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
  loginButton: {
    backgroundColor: '#43619D',
    justifyContent: 'center',
    height: 60,
    width: '80%'
  },
  loginContent: {
    flexDirection: 'row'
  },
  loginIcon: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginLabel: {
    flex: 0.85
  },
  loginText: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Medium',
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
    fontFamily: 'ProximaNovaSoft-Medium',
    fontWeight: 'bold'
  },
  visitContainer: {
    alignItems: 'center'
  },
  visitButton: {
    height: 60,
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FD482E',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  visitText: {
    color: '#FD482E',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Medium',
    fontWeight: 'bold'
  }
})