import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native'
import MapView, { MAP_TYPES, PROVIDER_GOOGLE } from 'react-native-maps'

const icons = {
  marker: require('./src/assets/imgs/marker-point.png')
}
const { width } = Dimensions.get('window')
const DEFAULT_LATITUDE_DELTA = 0.005
const DEFAULT_LONGITUDE_DELTA = 0.001

export default class ViewLocations extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    markers: PropTypes.array.isRequired
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.coordinate) !== JSON.stringify(nextProps.coordinate))
      this.mapView.animateToRegion({
        latitude: nextProps.coordinate.latitude,
        longitude: nextProps.coordinate.longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA
      })
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapView => { this.mapView = mapView }}
          mapType={MAP_TYPES.STANDARD}
          style={styles.mapContainer}
          showsUserLocation={true}
          showsMyLocationButton={true}
          toolbarEnabled={false}>
          {this.props.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.coordinate}
              image={icons.marker}>
              <MapView.Callout tooltip style={styles.mapCallout}>
                <View style={styles.calloutWrap}>
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                  <Text style={styles.markerDescription}>{marker.subtitle}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  },
  mapContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  mapCallout: {
    width: width * 0.9
  },
  calloutWrap: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#001f3f',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  markerTitle: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Medium'
  },
  markerDescription: {
    color: '#7f7f7f',
    fontSize: 16,
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})