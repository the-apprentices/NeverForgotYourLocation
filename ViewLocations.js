import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Mapbox, { MapView } from './src/config/Mapbox'

export default class ViewLocations extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView style={styles.mapContainer}
          initialZoomLevel={15}
          showsUserLocation={true}
          styleURL={Mapbox.mapStyles.streets}>
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  mapContainer: {
    flex: 1
  }
})