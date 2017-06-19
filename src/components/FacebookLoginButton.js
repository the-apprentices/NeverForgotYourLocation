import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback
} from 'react-native'


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
    fontWeight: 'bold'
  }
})

export default class FacebookLoginButton extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    onButtonPress: PropTypes.func.isRequired
  }
  onButtonPress() {
    this.props.onButtonPress()
  }
  render() {
    return (
      <View style={[styles.buttonWrapperStyle, this.props.buttonWrapperStyle]}>
        <TouchableNativeFeedback
          onPress={() => this.onButtonPress()}
          background={TouchableNativeFeedback.Ripple('#adadad', false)}>
          <View style={styles.buttonContainerStyle}>
            <View style={styles.iconContainer}>
              <Image style={styles.iconContent} source={icons.facebook} />
            </View>
            <View style={styles.buttonContentStyle}>
              <Text style={styles.buttonTextStyle}>
                LOG IN WITH FACEBOOK
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}