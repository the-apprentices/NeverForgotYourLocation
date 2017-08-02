import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
const styles = StyleSheet.create({
  buttonContainerStyle: {
    backgroundColor: '#12DD67',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'ProximaNovaSoft-Medium',
    fontWeight: 'normal'
  }
})
export default EditButton = ({ navigation, auth, markerKey, coordinate, oldTitle, oldDescription, dispatch }) => (
  <TouchableNativeFeedback
    onPress={() => navigation.dispatch({
      type: 'EditLocation',
      params: {
        userId: auth.uid,
        key: markerKey,
        coordinate: coordinate,
        oldTitle: oldTitle,
        oldDescription: oldDescription,
        dispatch: dispatch
      }
    })}
    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
    <View style={styles.buttonContainerStyle}>
      <Text style={styles.buttonTextStyle}>EDIT</Text>
    </View>
  </TouchableNativeFeedback>
)
EditButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  markerKey: PropTypes.string.isRequired,
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired,
  oldTitle: PropTypes.string.isRequired,
  oldDescription: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}