import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { MAP_TYPES, PROVIDER_GOOGLE } from 'react-native-maps'
import Marker from '../components/Marker'
import NewMarker from '../components/NewMarker'
const DEFAULT_LATITUDE_DELTA = 0.005
const DEFAULT_LONGITUDE_DELTA = 0.001
const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: 1
  },
})

export default class CustomMapView extends Component {
  constructor(props) {
    super(props)
    this.wasUpdate = false
    this.state = {
      bottom: 1,
      region: null
    }
  }
  static propTypes = {
    listMarkers: PropTypes.arrayOf(PropTypes.shape({
      coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isSavingMode: PropTypes.bool.isRequired,
    // keySelected: PropTypes.string,
    zoomEnabled: PropTypes.bool.isRequired,
    scrollEnabled: PropTypes.bool.isRequired,
    showsMyLocationButton: PropTypes.bool.isRequired,
    targetCoordinate: PropTypes.object,
    onChangeCoordinate: PropTypes.func
  }
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LONGITUDE_DELTA
        }
      })
      this.props.onChangeCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })

    },
      (error) => ToastAndroid.show('Can not get your location', ToastAndroid.LONG)
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LONGITUDE_DELTA
        }
      })
    })
  }
  componentWillMount() {
    this.getCurrentLocation()
    // this setTimeout to re-render mapview to show my location button
    // this is a bug from react native map package
    setTimeout(() => this.setState({ bottom: 0 }), 1000)
  }
  componentDidUpdate() {
    if ((this.props.isSavingMode) && (!this.wasUpdate)) {
      this.mapView.animateToRegion(this.state.region)
      this.wasUpdate = !this.wasUpdate
    }
    if ((!this.props.isSavingMode) && (this.wasUpdate)) {
      this.props.onChangeCoordinate({
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      })
      this.wasUpdate = false
    }
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }
  onMapPress(e) {
    if (this.props.isSavingMode)
      this.props.onChangeCoordinate(e.nativeEvent.coordinate)
  }
  onDragMarker(coordinate) {
    this.props.onChangeCoordinate(coordinate)
  }
  render() {
    const newMarker = !this.props.isSavingMode ? null :
      <NewMarker targetCoordinate={this.props.targetCoordinate}
        onDragMarker={this.onDragMarker.bind(this)} />
    return (
      <MapView ref={mapView => { this.mapView = mapView }}
        style={[styles.mapContainer, { bottom: this.state.bottom }]}
        provider={PROVIDER_GOOGLE}
        mapType={MAP_TYPES.STANDARD}
        showsUserLocation={true}
        toolbarEnabled={false}
        initialRegion={this.state.region}
        showsMyLocationButton={this.props.showsMyLocationButton}
        zoomEnabled={this.props.zoomEnabled}
        scrollEnabled={this.props.scrollEnabled}
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