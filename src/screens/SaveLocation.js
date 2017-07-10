import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  ToastAndroid
} from 'react-native'

import BackButton from '../components/BackButton'
import DoneButton from '../components/DoneButton'
import MapView from '../containers/MapView'
import SaveButton from '../containers/EnableSaveLocation'
import WrapLocationInformation from '../containers/WrapLocationInformation'

import * as Handler from '../helpers/handleDataWithFirebase'

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
    this.currentUser = null
    this.state = {
      region: null,
      currentCoordinate: null,
      listMarkers: [],
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
      saveButtonDisplay: 'flex',
      placeAddress: '',
      placeName: '',
      currentCoordinate: {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      }
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
        title: this.state.placeName,
        description: this.state.placeAddress
      }
      this.saveCurrentLocation(dataToSave)
        .then(() => {
          ToastAndroid.show('Save Location successfully!', ToastAndroid.LONG)
          Keyboard.dismiss()
          this.onChangeLayoutWhenBackButtonClicked(setParams)
        })
    }
  }
  onHandleConnectivityChange = (isConnected) => {
    if ((isConnected) && (this.state.currentCoordinate)) {
      /**
       * 
       */
      Helpers.getAddress(this.state.currentCoordinate)
        .then(({ placeAddress }) => this.setState({
          placeAddress: placeAddress
        }))
    }
  }

  getAllMarkers = async () => {
    let listMarkers = await Handler.getAllMarkerData(this.currentUser.uid)
    this.setState({ listMarkers })
  }
  saveCurrentLocation = async (data) => {
    if (this.currentUser) Handler.saveMarkerData(this.currentUser.uid, data)
    this.setState({
      listMarkers: [
        {
          ...data,
          key: `${data.coordinate.latitude}${data.coordinate.longitude}`
        },
        ...this.state.listMarkers
      ]
    })
  }

  componentWillMount() {
    this.getCurrentLocation()
  }
  componentDidMount() {
    this.getAllMarkers()
  }
  componentWillUnmount() {
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
    Helpers.getAddress(this.state.currentCoordinate)
      .then(({ placeAddress }) => this.setState({
        placeAddress: placeAddress
      }))
    this.onChangeLayoutWhenSaveButtonClicked()
    setParams({
      isSavingState: true,
      backButtonAction: () => this.onChangeLayoutWhenBackButtonClicked(setParams),
      doneButtonAction: () => this.onButtonDonePress(setParams)
    })
  }

  render() {
    const { state, setParams } = this.props.navigation
    this.currentUser = state.params.currentUser
    return (
      <View style={styles.mainContainer}>
        <MapView mapRef={mapView => { this.mapView = mapView }}
          region={this.state.region}
          listMarkers={this.state.listMarkers}
          isSavingState={state.params.isSavingState}
          onMapPress={this.onMapPress.bind(this)}
          currentCoordinate={this.state.currentCoordinate}
          showsMyLocationButton={true}
        />
        <WrapLocationInformation
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