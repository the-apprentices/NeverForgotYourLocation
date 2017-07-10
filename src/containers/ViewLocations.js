import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import MapView from './MapView'

export default class ViewLocations extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    mapRef: PropTypes.func.isRequired,
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
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    keySelected: PropTypes.string.isRequired
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView mapRef={this.props.mapRef}
          region={this.props.region}
          listMarkers={this.props.listMarkers}
          keySelected={this.props.keySelected}
          isSavingState={false}
          showsMyLocationButton={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  }
})