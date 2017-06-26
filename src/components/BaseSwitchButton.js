import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'

export default class BaseSwitchButton extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    onSwitchState: PropTypes.func.isRequired
  }
  onButtonPress() {
    this.props.onSwitchState()
  }
  render() {
    const backgroundColorState = { backgroundColor: this.props.backgroundColor }
    const textColorState = { color: this.props.textColor }
    return (
      <View style={[styles.buttonContainer, backgroundColorState]}>
        <TouchableNativeFeedback
          onPress={() => this.onButtonPress()}
          background={TouchableNativeFeedback.Ripple('#adadad', true)}>
          <View style={[styles.buttonContainer, { width: '100%' }, backgroundColorState]}>
            <Text style={[styles.buttonText, textColorState]}>{this.props.buttonText}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD482E',
    borderRadius: 30
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})