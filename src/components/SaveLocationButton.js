
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
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
    fontWeight: 'normal'
  }
})

export default SaveButton = ({ style, navigation }) => (
  <View style={[styles.buttonWrapperStyle, style]}>
    <TouchableNativeFeedback
      onPress={() => navigation.dispatch({ type: 'SaveLocation' })}
      background={TouchableNativeFeedback.Ripple('#adadad', false)}>
      <View style={styles.buttonContainerStyle}>
        <Text style={styles.buttonTextStyle}>
          SAVE LOCATION
            </Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)
SaveButton.propTypes = {
  style: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired
}