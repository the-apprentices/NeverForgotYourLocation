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
    fontWeight: 'normal'
  }
})

export default ViewPlacesButton = ({ navigation }) => (
  <View style={styles.buttonWrapperStyle}>
    <TouchableNativeFeedback
      onPress={() => navigation.dispatch({ type: 'VisitedLocations' })}
      background={TouchableNativeFeedback.Ripple('#adadad', false)}>
      <View style={styles.buttonContainerStyle}>
        <Text style={styles.buttonTextStyle}>
          VISITED PLACES
            </Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)
ViewPlacesButton.propTypes = {
  navigation: PropTypes.object.isRequired
}