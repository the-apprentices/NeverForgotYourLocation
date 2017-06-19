import React, { Component, PropTypes } from 'react'
import MapView from 'react-native-maps'
import Callout from './Callout'

const icons = {
  marker: require('../assets/imgs/marker-point.png')
}

export default class Marker extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    marker: PropTypes.shape({
      coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }).isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    return (
      <MapView.Marker
        coordinate={this.props.marker.coordinate}
        image={icons.marker}>
        <Callout marker={{ title: this.props.marker.title, subtitle: this.props.marker.subtitle }} />
      </MapView.Marker>
    )
  }
}