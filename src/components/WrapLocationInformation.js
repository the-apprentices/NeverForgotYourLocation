import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import LocationTextInput from './LocationTextInput'
const icons = {
  place: require('../assets/imgs/favorite-place.png'),
  flag: require('../assets/imgs/flag.png')
}
const styles = StyleSheet.create({
  saveContentContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  borderContainer: {
    flexDirection: 'row'
  },
  borderWhite: {
    flex: 0.15,
    height: 1,
    backgroundColor: '#FFFFFF'
  },
  borderView: {
    flex: 0.85,
    height: 1,
    backgroundColor: '#757575'
  }
})

export default WrapLocationInformation = ({ style, placeName, onChangePlaceName, placeAddress, onChangePlaceAddress }) => (
  <View style={[styles.saveContentContainer, style]}>
    <LocationTextInput icon={icons.place}
      placeHolder={'Place Name'}
      textValue={placeName}
      onChangeText={onChangePlaceName} />
    <View style={styles.borderContainer}>
      <View style={styles.borderWhite}></View>
      <View style={styles.borderView}></View>
    </View>
    <LocationTextInput icon={icons.flag}
      placeHolder={'Place Address'}
      textValue={placeAddress}
      onChangeText={onChangePlaceAddress} />
  </View>
)
WrapLocationInformation.propTypes = {
  style: PropTypes.object,
  placeName: PropTypes.string.isRequired,
  onChangePlaceName: PropTypes.func.isRequired,
  placeAddress: PropTypes.string.isRequired,
  onChangePlaceAddress: PropTypes.func.isRequired
}