import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableNativeFeedback, ToastAndroid, Keyboard } from 'react-native'
import { getAddress } from '../helpers/getData'
import { editLocation } from '../actions'
const styles = StyleSheet.create({
  doneButtonContainter: {
    borderRadius: 5
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal',
    fontFamily: 'ProximaNovaSoft-Regular',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7
  }
})
const onButtonPress = (userId, markerKey, title, description, dispatch, navigation) => {
  dispatch(editLocation(userId, markerKey, title, description))
  ToastAndroid.show('Updated successfully!', ToastAndroid.LONG)
  navigation.dispatch({ type: 'BackAfterEdit' })
}
export default DoneEditButton = ({ userId, markerKey, title, description, dispatch, navigation }) => (
  <View style={styles.doneButtonContainter}>
    <TouchableNativeFeedback
      onPress={() => onButtonPress(userId, markerKey, title, description, dispatch, navigation)}
      background={TouchableNativeFeedback.Ripple('#adadad', true)}>
      <View style={styles.doneButton}>
        <Text style={styles.doneButtonText}>DONE</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)
DoneEditButton.propTypes = {
  userId: PropTypes.string.isRequired,
  markerKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}