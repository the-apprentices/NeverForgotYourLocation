import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Mapbox, { MapView } from './src/config/Mapbox'

export default class ViewLocations extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    annotations: PropTypes.array.isRequired,
    coordinate: PropTypes.object.isRequired
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.coordinate) !== JSON.stringify(nextProps.coordinate))
      this.mapView.setCenterCoordinate(nextProps.coordinate.latitude,
        nextProps.coordinate.longitude, animated = true)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView ref={(mapView) => this.mapView = mapView}
          style={styles.mapContainer}
          initialCenterCoordinate={this.props.coordinate}
          initialZoomLevel={15}
          showsUserLocation={true}
          styleURL={Mapbox.mapStyles.streets}
          annotations={this.props.annotations}>
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