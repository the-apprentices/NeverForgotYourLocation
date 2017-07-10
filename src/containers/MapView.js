import React, { Component, PropTypes } from 'react'
import {
  StyleSheet
} from 'react-native'
import MapView, { MAP_TYPES, PROVIDER_GOOGLE } from 'react-native-maps'
import Marker from '../components/Marker'
import NewMarker from '../components/NewMarker'

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: 1
  },
})

export default class SaveLocation extends Component {
  constructor(props) {
    super(props)
    this.state = { bottom: 1 }
  }
  static propTypes = {
    mapRef: PropTypes.func,
    region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }),
    listMarkers: PropTypes.arrayOf(PropTypes.shape({
      coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isSavingState: PropTypes.bool.isRequired,
    onMapPress: PropTypes.func,
    currentCoordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }),
    keySelected: PropTypes.string,
    zoomEnabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    showsMyLocationButton: PropTypes.bool.isRequired
  }

  componentWillMount() {
    // this setTimeout to re-render mapview to show my location button
    // this is a bug from react native map package
    setTimeout(() => this.setState({ bottom: 0 }), 1000)
  }
  onMapPress(e) {
    if (this.props.isSavingState)
      this.props.onMapPress(e.nativeEvent.coordinate)
  }
  render() {
    const newMarker = !this.props.isSavingState ? null :
      <NewMarker currentCoordinate={this.props.currentCoordinate}
        onDragMarker={this.props.onMapPress} />
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={this.props.mapRef}
        mapType={MAP_TYPES.STANDARD}
        style={[styles.mapContainer, { bottom: this.state.bottom }]}
        showsUserLocation={true}
        showsMyLocationButton={this.props.showsMyLocationButton}
        zoomEnabled={this.props.zoomEnabled}
        scrollEnabled={this.props.scrollEnabled}
        initialRegion={this.props.region}
        toolbarEnabled={false}
        onPress={(e) => this.onMapPress(e)}>
        {newMarker}
        {this.props.listMarkers.map(marker => (
          <Marker key={marker.key}
            markerSelected={marker.key === this.props.keySelected}
            marker={marker} />
        ))}
      </MapView>
    )
  }
}