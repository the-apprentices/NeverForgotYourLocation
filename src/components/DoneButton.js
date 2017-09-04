import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableNativeFeedback, ToastAndroid, Keyboard } from 'react-native'
import { getAddress } from '../helpers/getData'
import { storeLocation } from '../actions'
import { onChangeMode, onChangeCoordinate } from '../actions/saveScreen'
const styles = StyleSheet.create({
  doneButtonContainter: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneButtonWrapper: {
    borderRadius: 2
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal',
    fontFamily: 'ProximaNovaSoft-Regular',
    padding: 5
  }
})
const onButtonPress = async (auth, uiState) => {
  const { dispatch, placeName, placeAddress, targetCoordinate } = uiState
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
    dispatch(onChangeMode(false, dispatch))
    Keyboard.dismiss()
    ToastAndroid.show('Your location was saved successfully!', ToastAndroid.LONG)
  }
}
const DoneButton = ({ auth, uiState }) => (
  <View style={[styles.doneButtonContainter, { display: uiState.isSavingMode ? 'flex' : 'none' }]}>
    <View style={styles.doneButtonWrapper}>
      <TouchableNativeFeedback
        onPress={() => onButtonPress(auth, uiState)}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.doneButton}>
          <Text style={styles.doneButtonText}>DONE</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  </View>
)
DoneButton.propTypes = {
  auth: PropTypes.object.isRequired,
  uiState: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth.auth,
  uiState: state.saveScreen
})
export default connect(mapStateToProps)(DoneButton)