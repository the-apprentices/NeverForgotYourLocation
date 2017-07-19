import React, { Component, PropTypes } from 'react'
import MapView from 'react-native-maps'

const icons = {
  marker: require('../assets/imgs/marker-point.png')
}

export default class NewMarker extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    targetCoordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired,
    onDragMarker: PropTypes.func.isRequired
  }

  onDragMarker(e) {
    this.props.onDragMarker(e.nativeEvent.coordinate)
  }
  render() {
    return (
      <MapView.Marker
        coordinate={this.props.targetCoordinate}
        onDragEnd={(e) => this.onDragMarker(e)}
         //image={icons.marker} 
        draggable
      />
    )
  }
}