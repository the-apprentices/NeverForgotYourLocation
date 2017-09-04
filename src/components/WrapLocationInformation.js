import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import CardView from 'react-native-cardview'
import LocationTextInput from './LocationTextInput'
const icons = {
  place: require('../assets/imgs/favorite-place.png'),
  flag: require('../assets/imgs/flag.png')
}
const styles = StyleSheet.create({
  saveContentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 8,
    borderRadius: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  borderContainer: {
    flexDirection: 'row'
  },
  borderWhite: {
    flex: 0.1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF'
  },
  borderView: {
    flex: 0.9,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#757575'
  }
})

export default WrapLocationInformation = ({
   style, placeName, listPlaceName, onChangePlaceName,
  placeAddress, onChangePlaceAddress, listPlaceAddress, navigation
   }) => (
    <CardView style={[styles.saveContentContainer, style]}
      cardElevation={4}
      cardMaxElevation={0}
      cornerRadius={2}>
      <LocationTextInput icon={icons.place}
        placeHolder={'Place Name'}
        textValue={placeName}
        suggestionList={listPlaceName}
        onChangeText={onChangePlaceName}
        navigation={navigation} />
      <View style={styles.borderContainer}>
        <View style={styles.borderWhite}></View>
        <View style={styles.borderView}></View>
      </View>
      <LocationTextInput icon={icons.flag}
        placeHolder={'Place Address'}
        textValue={placeAddress}
        suggestionList={listPlaceAddress}
        onChangeText={onChangePlaceAddress}
        navigation={navigation} />
    </CardView>
  )
WrapLocationInformation.propTypes = {
  style: PropTypes.object,
  placeName: PropTypes.string.isRequired,
  listPlaceName: PropTypes.array.isRequired,
  onChangePlaceName: PropTypes.func.isRequired,
  placeAddress: PropTypes.string.isRequired,
  onChangePlaceAddress: PropTypes.func.isRequired,
  listPlaceAddress: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
}