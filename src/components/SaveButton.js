import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'

const styles = StyleSheet.create({
  buttonWrapperStyle: {
    alignItems: 'center'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '80%',
    backgroundColor: '#FD482E'
  },
  buttonTextStyle: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Regular',
    fontWeight: 'bold'
  }
})

export default class SaveButton extends Component {
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
            <Text style={styles.buttonTextStyle}>
              SAVE LOCATION
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}