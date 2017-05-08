import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'

export default class SwitchButton extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    leftButtonBackgroundColor: PropTypes.string.isRequired,
    rightButtonBackgroundColor: PropTypes.string.isRequired,
    leftButtonTextColor: PropTypes.string.isRequired,
    rightButtonTextColor: PropTypes.string.isRequired,
    onSwitchButtonPress: PropTypes.func.isRequired
  }
  onSwitchToLeft() {
    this.props.onSwitchButtonPress(true)
  }
  onSwitchToRight() {
    this.props.onSwitchButtonPress(false)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Button buttonText='FRIENDS'
          backgroundColor={this.props.leftButtonBackgroundColor}
          textColor={this.props.leftButtonTextColor}
          onSwitchState={this.onSwitchToLeft.bind(this)}
        />
        <Button buttonText='LOCATIONS'
          backgroundColor={this.props.rightButtonBackgroundColor}
          textColor={this.props.rightButtonTextColor}
          onSwitchState={this.onSwitchToRight.bind(this)}
        />
      </View>
    )
  }
}

class Button extends Component {
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
  mainContainer: {
    flexDirection: 'row',
    height: 60,
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7D8DA',
    borderColor: '#FD482E',
    borderWidth: 1,
    borderRadius: 30
  },
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