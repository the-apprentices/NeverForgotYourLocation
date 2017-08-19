import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'
const styles = StyleSheet.create({
  markerContainer: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    top: '50%',
    left: '50%',
    marginTop: -48,
    marginLeft: -24
  },
  markerSize: {
    width: 48,
    height: 48
  }
})
const icons = {
  marker: require('../assets/imgs/marker-point.png')
}

export default NewMarker = ({ display }) => (
  <View style={[styles.markerContainer, { display: display }]}>
    <Image style={styles.markerSize} source={icons.marker} />
  </View>
)
NewMarker.propTypes = {
  display: PropTypes.string.isRequired
}