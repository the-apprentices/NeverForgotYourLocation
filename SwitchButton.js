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
    this.state = {
      backgroundColorButtonLeft: '#FD482E',
      textColorButtonLeft: '#ffffff',
      backgroundColorButtonRight: '#D7D8DA',
      textColorButtonRight: '#FD482E'
    }
  }
  static propTypes = {
    onSwitchButtonPress: PropTypes.func.isRequired
  }
  switchToLeft() {
    this.props.onSwitchButtonPress(true)
    this.setState({
      backgroundColorButtonLeft: '#FD482E',
      textColorButtonLeft: '#ffffff',
      backgroundColorButtonRight: '#D7D8DA',
      textColorButtonRight: '#FD482E'
    })
  }
  switchToRight() {
    this.props.onSwitchButtonPress(false)
    this.setState({
      backgroundColorButtonLeft: '#D7D8DA',
      textColorButtonLeft: '#FD482E',
      backgroundColorButtonRight: '#FD482E',
      textColorButtonRight: '#ffffff'
    })
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Button buttonText='FRIENDS'
          backgroundColor={this.state.backgroundColorButtonLeft}
          textColor={this.state.textColorButtonLeft}
          switchState={this.switchToLeft.bind(this)}
        />
        <Button buttonText='LOCATIONS'
          backgroundColor={this.state.backgroundColorButtonRight}
          textColor={this.state.textColorButtonRight}
          switchState={this.switchToRight.bind(this)}
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
    switchState: PropTypes.func.isRequired
  }
  onButtonPress() {
    this.props.switchState()
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