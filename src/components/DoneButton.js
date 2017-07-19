import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableNativeFeedback, ToastAndroid, Keyboard } from 'react-native'
import { getAddress } from '../helpers/getData'
import { storeLocation } from '../actions'
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
const onButtonPress = async (state, setParams) => {
  const { auth, dispatch, placeName, placeAddress, targetCoordinate } = state.params
  if (!placeName)
    ToastAndroid.showWithGravity('Please type your place name!',
      ToastAndroid.LONG, ToastAndroid.CENTER)
  else if (!placeAddress)
    ToastAndroid.showWithGravity('Please type your place address!',
      ToastAndroid.LONG, ToastAndroid.CENTER)
  else if (!targetCoordinate)
    ToastAndroid.showWithGravity('Cannot get your location, please try later!',
      ToastAndroid.LONG, ToastAndroid.CENTER)
  else {
    dispatch(storeLocation(auth.uid, targetCoordinate, placeName, placeAddress))
    setParams({
      isSavingMode: false,
      displayWrapperInfor: 'none',
      displaySaveButton: 'flex'
    })
    Keyboard.dismiss()
    let initPlaceAddress = await getAddress(targetCoordinate)
    setParams({
      placeName: '',
      placeAddress: initPlaceAddress
    })
    ToastAndroid.show('Your location saved successfully!', ToastAndroid.LONG)
  }
}
export default DoneButton = ({ state, setParams }) => (
  <View style={styles.doneButtonContainter}>
    <TouchableNativeFeedback
      onPress={() => onButtonPress(state, setParams)}
      background={TouchableNativeFeedback.Ripple('#adadad', true)}>
      <View style={styles.doneButton}>
        <Text style={styles.doneButtonText}>DONE</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)
DoneButton.propTypes = {
  state: PropTypes.object.isRequired,
  setParams: PropTypes.func.isRequired
}