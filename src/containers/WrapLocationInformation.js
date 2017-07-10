import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import LocationTextInput from '../components/LocationTextInput'

const icons = {
  place: require('../assets/imgs/favorite-place.png'),
  flag: require('../assets/imgs/flag.png')
}
const styles = StyleSheet.create({
  saveContentContainer: {
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  borderContainer: {
    flexDirection: 'row'
  },
  borderWhite: {
    flex: 0.15,
    height: 1,
    backgroundColor: '#FFFFFF'
  },
  borderView: {
    flex: 0.85,
    height: 1,
    backgroundColor: '#757575'
  }
})

export default class WrapLocationInformation extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    buttonWrapperStyle: PropTypes.object,
    placeName: PropTypes.string.isRequired,
    onChangePlaceName: PropTypes.func.isRequired,
    placeAddress: PropTypes.string.isRequired,
    onChangePlaceAddress: PropTypes.func.isRequired
  }

  onViewButtonPress() {
    this.props.onButtonPress()
  }

  render() {
    return (
      <View style={[styles.saveContentContainer, this.props.buttonWrapperStyle]}>
        <LocationTextInput icon={icons.place}
          placeHolder={'Place Name'}
          textValue={this.props.placeName}
          onChangeText={this.props.onChangePlaceName}/>
        <View style={styles.borderContainer}>
          <View style={styles.borderWhite}></View>
          <View style={styles.borderView}></View>
        </View>
        <LocationTextInput icon={icons.flag}
          placeHolder={'Place Address'}
          textValue={this.props.placeAddress}
          onChangeText={this.props.onChangePlaceAddress}/>
      </View>
    )
  }
}