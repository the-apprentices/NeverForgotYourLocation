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
  NetInfo,
  Dimensions
} from 'react-native'

import MapView, { MAP_TYPES, PROVIDER_GOOGLE } from 'react-native-maps'
import Helpers from './src/helpers/handleData'

const icons = {
  place: require('./src/assets/imgs/favorite-place.png'),
  flag: require('./src/assets/imgs/flag.png'),
  back: require('./src/assets/imgs/back-left.png'),
  search: require('./src/assets/imgs/search.png'),
  marker: require('./src/assets/imgs/marker-point.png')
}
const { width } = Dimensions.get('window')
const DEFAULT_LATITUDE_DELTA = 0.005
const DEFAULT_LONGITUDE_DELTA = 0.001
const INIT_MAP_VIEW_TOP_SPACE = 0
const INIT_MAP_VIEW_BOTTOM_SPACE = 60
const MAP_VIEW_TOP_SPACE = 120
const MAP_VIEW_BOTTOM_SPACE = 0

export default class SaveLocation extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, goBack } = navigation
    const rightButton = (!state.params.isSavingState) ? null :
      <TouchableNativeFeedback
        onPress={() => {
          state.params.doneButtonAction()
        }}
        background={TouchableNativeFeedback.Ripple('#adadad', false)}>
        <View style={styles.doneButton}>
          <Text style={styles.doneButtonText}>DONE</Text>
        </View>
      </TouchableNativeFeedback>
    return {
      title: 'SAVE LOCATION',
      headerLeft: <TouchableNativeFeedback
        onPress={() => {
          if (!state.params.isSavingState) goBack()
          else {
            state.params.backButtonAction()
          }
        }}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.backButton}>
          <Image style={styles.backIcon} source={icons.back} />
        </View>
      </TouchableNativeFeedback>,
      headerRight: <View style={styles.doneWrap}>
        {rightButton}
      </View>
    }
  }
  constructor(props) {
    super(props)
    this.watchID = null
    this.state = {
      region: null,
      currentMarker: {
        coordinate: null
      },
      listMakers: [],
      placeName: null,
      placeAddress: null,
      saveContentDisplay: 'none',
      saveButtonDisplay: 'flex',
      mapViewTopSpace: INIT_MAP_VIEW_TOP_SPACE,
      mapViewBottomSpace: INIT_MAP_VIEW_BOTTOM_SPACE + 1
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
        currentMarker: {
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
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
      mapViewTopSpace: MAP_VIEW_TOP_SPACE,
      mapViewBottomSpace: MAP_VIEW_BOTTOM_SPACE,
      currentMarker: {
        coordinate: {
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude
        }
      }
    })
    this.mapView.animateToRegion(this.state.region)
  }
  onChangeLayoutWhenBackButtonClicked(setParams) {
    this.setState({
      saveContentDisplay: 'none',
      saveButtonDisplay: 'flex',
      mapViewTopSpace: INIT_MAP_VIEW_TOP_SPACE,
      mapViewBottomSpace: INIT_MAP_VIEW_BOTTOM_SPACE
    })
    setParams({ isSavingState: false })
  }
  onButtonDonePress(setParams) {
    if (!this.state.placeName) {
      ToastAndroid.showWithGravity('Please type your place name!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if (!this.state.placeAddress) {
      ToastAndroid.showWithGravity('Please type your place address!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if (!this.state.currentMarker.coordinate) {
      ToastAndroid.showWithGravity('Cannot get your location, please try later!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else {
      let dataToSave = {
        coordinate: { longitude: this.state.currentMarker.coordinate.longitude, latitude: this.state.currentMarker.coordinate.latitude },
        placeName: this.state.placeName,
        placeAddress: this.state.placeAddress
      }
      this.saveCurrentLocation(dataToSave)
        .then((uid) => this.getNewMarker(uid))
        .then((newMarker) => {
          let listMakers = this.state.listMakers.concat()
          listMakers.push(newMarker)
          this.setState({ listMakers })
        })
        .then(() => {
          ToastAndroid.show('Save Location successfully!', ToastAndroid.LONG)
          Keyboard.dismiss()
          this.onChangeLayoutWhenBackButtonClicked(setParams)
        })
    }
  }
  onHandleConnectivityChange = (isConnected) => {
    if ((isConnected) && (this.state.currentMarker.coordinate)) {
      Helpers.getAddress(this.state.currentMarker.coordinate)
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
    // this setTimeout to re-render mapview to show my location button
    // this is a bug from react native map package
    setTimeout(() => this.setState({ mapViewBottomSpace: INIT_MAP_VIEW_BOTTOM_SPACE }), 1000)
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

  onMapPress(e, state) {
    if (state.params.isSavingState) {
      this.setState({
        currentMarker: {
          coordinate: e.nativeEvent.coordinate
        }
      })
      Helpers.getAddress(e.nativeEvent.coordinate)
        .then(({ placeAddress }) => this.setState({
          placeAddress: placeAddress
        }))
    }
  }
  onDragMarker(e) {
    this.setState({
      currentMarker: {
        coordinate: e.nativeEvent.coordinate
      }
    })
    Helpers.getAddress(e.nativeEvent.coordinate)
      .then(({ placeAddress }) => this.setState({
        placeAddress: placeAddress
      }))
  }
  onButtonSavePress(setParams) {
    this.onChangeLayoutWhenSaveButtonClicked()
    setParams({
      isSavingState: true,
      backButtonAction: () => this.onChangeLayoutWhenBackButtonClicked(setParams),
      doneButtonAction: () => this.onButtonDonePress(setParams)
    })
  }

  render() {
    const { state, setParams } = this.props.navigation
    const newMarker = ((!state.params.isSavingState) || (!this.state.currentMarker)) ? null :
      <MapView.Marker
        coordinate={this.state.currentMarker.coordinate}
        onDragEnd={(e) => this.onDragMarker(e)}
        image={icons.marker}
        draggable
      />
    return (
      <View style={styles.mainContainer}>
        <View style={{ height: 1, display: this.state.viewDisplay }}></View>
        <View style={[styles.saveContentContainer, { display: this.state.saveContentDisplay }]}>
          <View style={styles.placeContainer}>
            <View style={styles.placeWrap}>
              <Image style={styles.placeIcon} source={icons.place}></Image>
            </View>
            <TextInput style={styles.placeText}
              placeholder='Place name'
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
              placeholder='Place address'
              onChangeText={(placeAddress) => this.setState({ placeAddress })}
              multiline={false}
              underlineColorAndroid={'transparent'}
              value={this.state.placeAddress}
            />
          </View>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapView => { this.mapView = mapView }}
          mapType={MAP_TYPES.STANDARD}
          style={[styles.mapContainer,
          { top: this.state.mapViewTopSpace },
          { bottom: this.state.mapViewBottomSpace }
          ]}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={this.state.region}
          toolbarEnabled={false}
          onPress={(e) => this.onMapPress(e, state)}>
          {newMarker}
          {this.state.listMakers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.coordinate}
              image={icons.marker}>
              <MapView.Callout tooltip style={styles.mapCallout}>
                <View style={styles.calloutWrap}>
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                  <Text style={styles.markerDescription}>{marker.subtitle}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={[styles.saveButtonContainer, { display: this.state.saveButtonDisplay }]}>
          <TouchableNativeFeedback
            onPress={() => this.onButtonSavePress(setParams)}
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
  backButton: {
    flex: 1,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    width: 16,
    height: 16
  },
  doneWrap: {
    flex: 1,
    width: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal',
    fontFamily: 'ProximaNovaSoft-Regular',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7
  },
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  },
  mapContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
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
  saveContentContainer: {
    height: MAP_VIEW_TOP_SPACE,
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
  saveButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  saveButton: {
    height: INIT_MAP_VIEW_BOTTOM_SPACE,
    minWidth: '100%',
    backgroundColor: '#FD482E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveText: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Medium',
    fontWeight: 'bold'
  }
})