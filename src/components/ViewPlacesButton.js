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
    backgroundColor: '#FFFFFF',
    borderColor: '#FD482E',
    borderWidth: 1,
    height: 60,
    width: '80%'
  },
  buttonTextStyle: {
    color: '#FD482E',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Regular',
    fontWeight: 'bold'
  }
})

export default class ViewPlacesButton extends Component {
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
      <View style={styles.buttonWrapperStyle}>
        <TouchableNativeFeedback
          onPress={() => this.onButtonPress()}
          background={TouchableNativeFeedback.Ripple('#adadad', false)}>
          <View style={styles.buttonContainerStyle}>
            <Text style={styles.buttonTextStyle}>
              VISITED PLACES
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}