import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import MapView from 'react-native-maps'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
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
  },
})

export default class Callout extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    marker: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    return (
      <MapView.Callout tooltip style={styles.mapCallout}>
        <View style={styles.calloutWrap}>
          <Text style={styles.markerTitle}>{this.props.marker.title}</Text>
          <Text style={styles.markerDescription}>{this.props.marker.subtitle}</Text>
        </View>
      </MapView.Callout>
    )
  }
}