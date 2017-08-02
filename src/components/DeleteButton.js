import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableNativeFeedback, Alert, ToastAndroid } from 'react-native'
import { deleteLocation } from '../actions'
const styles = StyleSheet.create({
  buttonContainerStyle: {
    backgroundColor: '#FD482E',
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
const onButtonPress = (userId, markerKey, dispatch) => {
  Alert.alert(
    'Delete this location',
    'Are you sure?',
    [
      { text: 'Cancel', onPress: () => ToastAndroid.show('Cancelled!', ToastAndroid.SHORT) },
      {
        text: 'OK', onPress: () => {
          dispatch(deleteLocation(userId, markerKey))
          ToastAndroid.show('Deleted!', ToastAndroid.SHORT)
        }
      }
    ],
    { cancelable: false }
  )
}
export default DeleteButton = ({ auth, markerKey, dispatch }) => (
  <TouchableNativeFeedback
    onPress={() => onButtonPress(auth.uid, markerKey, dispatch)}
    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
    <View style={styles.buttonContainerStyle}>
      <Text style={styles.buttonTextStyle}>DELETE</Text>
    </View>
  </TouchableNativeFeedback>
)
DeleteButton.propTypes = {
  auth: PropTypes.object.isRequired,
  markerKey: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}