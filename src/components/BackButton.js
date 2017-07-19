import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, TouchableNativeFeedback, Keyboard } from 'react-native'
import { getAddress } from '../helpers/getData'
const icons = {
  back: require('../assets/imgs/back-left.png')
}
const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    width: 16,
    height: 16
  }
})

const onButtonPress = async (state, setParams, goBack) => {
  if (state.params.isSavingMode) {
    setParams({
      isSavingMode: false,
      displayWrapperInfor: 'none',
      displaySaveButton: 'flex'
    })
    Keyboard.dismiss()
    let placeAddress = await getAddress(state.params.targetCoordinate)
    setParams({
      placeName: '',
      placeAddress: placeAddress
    })
  }
  else goBack()
}

export default BackButton = ({ state, setParams, goBack }) => (
  <TouchableNativeFeedback
    onPress={() => onButtonPress(state, setParams, goBack)}
    background={TouchableNativeFeedback.Ripple('#adadad', true)}>
    <View style={styles.backButton}>
      <Image style={styles.backIcon} source={icons.back} />
    </View>
  </TouchableNativeFeedback>
)

BackButton.propTypes = {
  state: PropTypes.object.isRequired,
  setParams: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
}