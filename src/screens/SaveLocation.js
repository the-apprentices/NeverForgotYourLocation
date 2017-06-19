import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  ToastAndroid,
  NetInfo
} from 'react-native'

import BackButton from './src/components/BackButton'
import DoneButton from './src/components/DoneButton'
import MapView from './src/containers/MapView'
import SaveButton from './src/containers/EnableSaveLocation'
import HandleLocationInformation from './src/containers/HandleLocationInformation'

import Helpers from './src/helpers/handleData'

const DEFAULT_LATITUDE_DELTA = 0.005
const DEFAULT_LONGITUDE_DELTA = 0.001

export default class SaveLocation extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, goBack } = navigation
    const rightButton = (!state.params.isSavingState) ? null :
      <DoneButton onButtonPress={() => { state.params.doneButtonAction() }} />
    return {
      title: 'SAVE LOCATION',
      headerLeft: <BackButton
        onButtonPress={() => {
          if (!state.params.isSavingState) goBack()
          else {
            state.params.backButtonAction()
          }
        }} />,
      headerRight: <View style={styles.doneWrap}>{rightButton}</View>
    }
  }
  constructor(props) {
    super(props)
    this.watchID = null
    this.state = {
      region: null,
      currentCoordinate: null,
      listMakers: [],
      placeName: '',
      placeAddress: '',
      saveContentDisplay: 'none',
      saveButtonDisplay: 'flex'
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LONGITUDE_DELTA
        },
        currentCoordinate: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
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
  onChangeLayoutWhenSaveButtonClicked() {
    this.setState({
      saveContentDisplay: 'flex',
      saveButtonDisplay: 'none',
      currentCoordinate: {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      }
    })
    this.mapView.animateToRegion(this.state.region)
  }
  onChangeLayoutWhenBackButtonClicked(setParams) {
    this.setState({
      saveContentDisplay: 'none',
      saveButtonDisplay: 'flex'
    })
    Keyboard.dismiss()
    setParams({ isSavingState: false })
  }
  onButtonDonePress(setParams) {
    if (!this.state.placeName) {
      ToastAndroid.showWithGravity('Please type your place name!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if (!this.state.placeAddress) {
      ToastAndroid.showWithGravity('Please type your place address!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if (!this.state.currentCoordinate) {
      ToastAndroid.showWithGravity('Cannot get your location, please try later!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else {
      let dataToSave = {
        coordinate: { longitude: this.state.currentCoordinate.longitude, latitude: this.state.currentCoordinate.latitude },
        placeName: this.state.placeName,
        placeAddress: this.state.placeAddress
      }
      this.saveCurrentLocation(dataToSave)
        .then((uid) => this.getNewMarker(uid))
        .then((newMarker) => {
          let listMakers = this.state.listMakers.concat()
          listMakers.push(newMarker)
          this.setState({ listMakers, placeName: null })
        })
        .then(() => {
          ToastAndroid.show('Save Location successfully!', ToastAndroid.LONG)
          Keyboard.dismiss()
          this.onChangeLayoutWhenBackButtonClicked(setParams)
        })
    }
  }
  onHandleConnectivityChange = (isConnected) => {
    if ((isConnected) && (this.state.currentCoordinate)) {
      Helpers.getAddress(this.state.currentCoordinate)
        .then(({ placeAddress }) => this.setState({
          placeAddress: placeAddress
        }))
    }
  }

  getNewMarker = async (uid) => {
    let marker = await Helpers.getNewMarker(uid)
    return marker
  }
  getAllMarkers = async () => {
    let markers = await Helpers.getAllMarkers()
    return markers
  }
  saveCurrentLocation = async (data) => {
    let uid = await Helpers.saveCurrentLocation(data)
    return uid
  }

  componentWillMount() {
    this.getCurrentLocation()
  }
  componentDidMount() {
    this.getAllMarkers()
      .then((listMakers) => this.setState({ listMakers }))
    NetInfo.isConnected.addEventListener(
      'change',
      this.onHandleConnectivityChange
    )
    NetInfo.isConnected.fetch().done(
      this.onHandleConnectivityChange
    )
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.onHandleConnectivityChange
    )
    navigator.geolocation.clearWatch(this.watchID)
  }

  onChangePlaceName(placeName) {
    this.setState({ placeName })
  }
  onChangePlaceAddress(placeAddress) {
    this.setState({ placeAddress })
  }
  onMapPress(currentCoordinate) {
    this.setState({ currentCoordinate })
    Helpers.getAddress(currentCoordinate)
      .then(({ placeAddress }) => this.setState({
        placeAddress: placeAddress
      }))
  }
  onSaveButtonPress(setParams) {
    this.onChangeLayoutWhenSaveButtonClicked()
    setParams({
      isSavingState: true,
      backButtonAction: () => this.onChangeLayoutWhenBackButtonClicked(setParams),
      doneButtonAction: () => this.onButtonDonePress(setParams)
    })
  }

  render() {
    const { state, setParams } = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <MapView mapRef={mapView => { this.mapView = mapView }}
          region={this.state.region}
          listMakers={this.state.listMakers}
          isSavingState={state.params.isSavingState}
          onMapPress={this.onMapPress.bind(this)}
          currentCoordinate={this.state.currentCoordinate}
        />
        <HandleLocationInformation
          buttonWrapperStyle={{ display: this.state.saveContentDisplay }}
          placeName={this.state.placeName}
          onChangePlaceName={this.onChangePlaceName.bind(this)}
          placeAddress={this.state.placeAddress}
          onChangePlaceAddress={this.onChangePlaceAddress.bind(this)} />
        <SaveButton
          buttonWrapperStyle={{ display: this.state.saveButtonDisplay }}
          onButtonPress={() => this.onSaveButtonPress(setParams)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  doneWrap: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  }
})