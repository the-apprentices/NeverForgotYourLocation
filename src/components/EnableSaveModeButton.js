import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'

const styles = StyleSheet.create({
  buttonWrapperStyle: {
    ...StyleSheet.absoluteFillObject,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonContainerStyle: {
    height: 60,
    width: '90%',
    backgroundColor: '#FD482E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Medium',
    fontWeight: 'normal'
  }
})

export default class EnableSaveModeButton extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    buttonWrapperStyle: PropTypes.object.isRequired,
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
            <Text style={styles.buttonTextStyle}>
              SAVE
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}