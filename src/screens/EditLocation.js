import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback
} from 'react-native'
import MapView from '../containers/MapView'
import WrapLocationInformation from '../containers/WrapLocationInformation'
import DoneButton from '../components/DoneButton'
import * as Handler from '../helpers/handleDataWithFirebase'

const DEFAULT_LATITUDE_DELTA = 0.005
const DEFAULT_LONGITUDE_DELTA = 0.001
const icons = {
  search: require('../assets/imgs/search.png'),
  recycleBin: require('../assets/imgs/recycle-bin.png'),
  edit: require('../assets/imgs/pencil.png')
}

export default class EditLocation extends Component {
  constructor(props) {
    super(props)
    this.placeData = null
    this.setParams = null
    this.state = {
      placeData: [],
      placeName: '',
      placeAddress: ''
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, goBack } = navigation
    let { title, description, placeData } = state.params
    return {
      title: state.params.placeData.title,
      headerRight: <View style={styles.editWrap}>
        <DoneButton onButtonPress={() => {
          state.params.onDoneButtonPress(placeData.key, title, description)
          goBack()
        }} />
      </View>
    }
  }
  onChangePlaceName(placeName) {
    this.setState({
      placeName: placeName,
      placeData: [{ ...this.placeData, title: placeName }]
    })
    this.setParams({ title: placeName })
  }
  onChangePlaceAddress(placeAddress) {
    this.setState({
      placeAddress: placeAddress,
      placeData: [{ ...this.placeData, description: placeAddress }]
    })
    this.setParams({ description: placeAddress })
  }

  componentDidMount() {
    this.setState({
      placeData: [this.placeData],
      placeName: this.placeData.title,
      placeAddress: this.placeData.description
    })
    this.setParams({
      title: this.placeData.title,
      description: this.placeData.description
    })
  }
  render() {
    const { state, setParams } = this.props.navigation
    this.placeData = state.params.placeData
    this.setParams = setParams
    const region = {
      ...state.params.placeData.coordinate,
      latitudeDelta: DEFAULT_LATITUDE_DELTA,
      longitudeDelta: DEFAULT_LONGITUDE_DELTA
    }
    return (
      <View style={styles.mainContainer}>
        <MapView
          region={region}
          listMarkers={this.state.placeData}
          isSavingState={false}
          zoomEnabled={false}
          scrollEnabled={false}
          showsMyLocationButton={false} />
        <View style={styles.editInforContainer}>
          <WrapLocationInformation
            placeName={this.state.placeName}
            onChangePlaceName={this.onChangePlaceName.bind(this)}
            placeAddress={this.state.placeAddress}
            onChangePlaceAddress={this.onChangePlaceAddress.bind(this)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  editInforContainer: {
    ...StyleSheet.absoluteFillObject
  }
})