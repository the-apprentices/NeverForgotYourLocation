import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
const styles = StyleSheet.create({
  buttonWrapperStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 2
  },
  buttonContainerStyle: {
    height: 60,
    width: '90%',
    backgroundColor: '#FD482E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonTextStyle: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Medium',
    fontWeight: 'normal'
  }
})

export default SaveButton = ({ style, onButtonPress }) => (
  <View style={[styles.buttonWrapperStyle, style]}>
    <TouchableNativeFeedback
      onPress={() => onButtonPress()}
      background={TouchableNativeFeedback.Ripple('#adadad', false)}>
      <View style={styles.buttonContainerStyle}>
        <Text style={styles.buttonTextStyle}>
          SAVE
            </Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)
SaveButton.propTypes = {
  style: PropTypes.object.isRequired,
  onButtonPress: PropTypes.func.isRequired
}