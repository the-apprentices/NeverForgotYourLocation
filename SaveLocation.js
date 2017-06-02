import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableNativeFeedback,
  ToastAndroid,
  NetInfo
} from 'react-native'

import Mapbox, { MapView } from './src/config/Mapbox'
import Helpers from './src/helpers/handleData'

const icons = {
  place: require('./src/assets/imgs/favorite-place.png'),
  flag: require('./src/assets/imgs/flag.png')
}

export default class SaveLocation extends Component {
  static navigationOptions = {
    title: 'SAVE LOCATION'
  }
  constructor(props) {
    super(props)
    this.state = {
      coordinate: null,
      annotations: [],
      placeName: null,
      placeAddress: null
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coordinate: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
      this.map.setCenterCoordinateZoomLevel(position.coords.latitude, position.coords.longitude, 15)
    },
      (error) => ToastAndroid.show('Can not get your location', ToastAndroid.LONG)
    )
  }
  getAllAnnotations = async () => {
    let annotations = await Helpers.getAllAnnotations()
    return annotations
  }
  handleConnectivityChange = (isConnected) => {
    if ((isConnected) && (this.state.coordinate)) {
      Helpers.getAddress(this.state.coordinate)
        .then(({ placeName, placeAddress }) => this.setState({
          placeName: placeName,
          placeAddress: placeAddress
        }))
    }
  }
  componentDidMount() {
    this.getCurrentLocation()
    this.getAllAnnotations()
      .then((annotations) => this.setState({ annotations: annotations }))
      .catch((err) => ToastAndroid.show('Can not get your location', ToastAndroid.LONG))
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleConnectivityChange
    )
    NetInfo.isConnected.fetch().done(
      this.handleConnectivityChange
    )
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleConnectivityChange
    )
  }
  saveCurrentLocation = async (data) => {
    let uid = await Helpers.saveCurrentLocation(data)
    return uid
  }
  getNewAnnotation = async (uid) => {
    let annotation = await Helpers.getNewAnnotation(uid)
    return annotation
  }
  onButtonSavePress(navigate) {
    if (!this.state.placeName) {
      ToastAndroid.showWithGravity('Please type your place name!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if (!this.state.placeAddress) {
      ToastAndroid.showWithGravity('Please type your place address!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if (!this.state.coordinate) {
      ToastAndroid.showWithGravity('Cannot get your location, please try later!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else {
      let dataToSave = {
        coordinate: this.state.coordinate,
        placeName: this.state.placeName,
        placeAddress: this.state.placeAddress
      }
      this.saveCurrentLocation(dataToSave)
        .then((uid) => this.getNewAnnotation(uid))
        .then((annotation) => {
          let annotations = this.state.annotations.concat()
          annotations.push(annotation)
          this.setState({ annotations })
        })
        .then(() => {
          ToastAndroid.show('Save Location successfully!', ToastAndroid.LONG)
          setTimeout(() => {
            Keyboard.dismiss()
            navigate('Home')
          }, 500)
        })
    }
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.mainContainter}>
        <MapView style={styles.mapContainer}
          ref={(map) => this.map = map}
          initialZoomLevel={0}
          showsUserLocation={true}
          styleURL={Mapbox.mapStyles.streets}
          annotations={this.state.annotations}
        />
        <View style={styles.saveContainer}>
          <View style={styles.placeContainer}>
            <View style={styles.placeWrap}>
              <Image style={styles.placeIcon} source={icons.place}></Image>
            </View>
            <TextInput style={styles.placeText}
              placeholder="Place name"
              onChangeText={(placeName) => this.setState({ placeName })}
              multiline={false}
              underlineColorAndroid={'transparent'}
              value={this.state.placeName}
            />
          </View>
          <View style={styles.borderContainer}>
            <View style={styles.borderWhite}></View>
            <View style={styles.borderView}></View>
          </View>
          <View style={styles.placeContainer}>
            <View style={styles.placeWrap}>
              <Image style={styles.placeIcon} source={icons.flag}></Image>
            </View>
            <TextInput style={styles.placeText}
              placeholder="Place address"
              onChangeText={(placeAddress) => this.setState({ placeAddress })}
              multiline={false}
              underlineColorAndroid={'transparent'}
              value={this.state.placeAddress}
            />
          </View>
        </View>
        <View style={styles.saveContent}>
          <TouchableNativeFeedback
              onPress={() => this.onButtonSavePress(navigate)}
              background={TouchableNativeFeedback.Ripple('#adadad', false)}>
              <View style={styles.saveButton}>
                <Text style={styles.saveText}>
                  SAVE
                </Text>
              </View>
            </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainter: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  },
  mapContainer: {
    flex: 1
  },
  saveContainer: {
    height: 121,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  placeContainer: {
    flexDirection: 'row'
  },
  placeWrap: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeIcon: {
    width: 30,
    height: 30
  },
  placeText: {
    flex: 0.85,
    color: '#000000',
    fontSize: 16,
    fontWeight: 'normal',
    paddingLeft: 7,
    fontFamily: 'ProximaNovaSoft-Regular'
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
  },
  saveContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    height: 60,
    minWidth: '100%',
    backgroundColor: '#FD482E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveText: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: "ProximaNovaSoft-Medium",
    fontWeight: 'bold'
  }
})