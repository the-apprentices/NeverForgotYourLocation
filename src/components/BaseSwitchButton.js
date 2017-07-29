import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
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

export default BaseSwitchButton = ({ buttonText, backgroundColor, textColor, onButtonPress }) => (
  <View style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}>
    <TouchableNativeFeedback
      onPress={() => onButtonPress()}
      background={TouchableNativeFeedback.Ripple('#adadad', true)}>
      <View style={[styles.buttonContainer, { width: '100%' }, { backgroundColor: backgroundColor }]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{buttonText}</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)
BaseSwitchButton.PropTypes = {
  buttonText: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired
}