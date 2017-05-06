import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage
} from 'react-native'
import Spinner from 'react-native-spinkit'
import Mapbox, { MapView } from './src/config/Mapbox'

const icons = {
  user: require('./src/assets/imgs/user.png'),
  place: require('./src/assets/imgs/placeholder.png')
}

export default class SaveLocation extends Component {
  static navigationOptions = {
    title: 'SAVE LOCATION'
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      coordinate: {
        longitude: null,
        latitude: null
      },
      annotations: null,
      placeName: null,
      placeAddress: null
    }
  }
  componentDidMount() {
    // AsyncStorage.clear((err)=>{})
    navigator.geolocation.getCurrentPosition((position) => {
      let coordinate = {}
      coordinate.longitude = position.coords.longitude
      coordinate.latitude = position.coords.latitude
      this.setState({
        coordinate: coordinate
      })
    })
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, locations) => {
        let annotations = []
        locations.map((result, idx, location) => {
          let data = JSON.parse(location[idx][1])
          let annotation = {
            coordinates: data.coordinates,
            type: 'point',
            title: data.placeName,
            subtitle: data.placeAddress,
            id: location[idx][0]
          }
          annotations.push(annotation)
        })
        this.setState({
          annotations: annotations,
          isLoading: false
        })
      })
    })
  }
  onButtonSavePress(navigate) {
    if (!this.state.placeName) {
      ToastAndroid.showWithGravity('Please type your place name!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if (!this.state.placeAddress) {
      ToastAndroid.showWithGravity('Please type your place address!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else if ((!this.state.coordinate.latitude) || (!this.state.coordinate.longitude)) {
      ToastAndroid.showWithGravity('Cannot get your location, please try later!',
        ToastAndroid.LONG, ToastAndroid.CENTER)
    } else {
      let uid = this.state.coordinate.latitude.toString() + this.state.coordinate.longitude.toString()
      let dataToSave = {
        coordinates: [this.state.coordinate.latitude, this.state.coordinate.longitude],
        placeName: this.state.placeName,
        placeAddress: this.state.placeAddress
      }
      AsyncStorage.setItem(uid, JSON.stringify(dataToSave), () => {
        AsyncStorage.getItem(uid, (err, location) => {
          let data = JSON.parse(location)
          let annotations = this.state.annotations.concat()
          let annotation = {
            coordinates: data.coordinates,
            type: 'point',
            title: data.placeName,
            subtitle: data.placeAddress,
            id: uid
          }
          annotations.push(annotation)
          this.setState({ annotations })
        })
      })
      ToastAndroid.show('Save Location successfully!', ToastAndroid.LONG)
      setTimeout(() => {
        navigate('Home')
      }, 500)
    }
  }
  render() {
    const { navigate } = this.props.navigation
    if (this.state.isLoading) {
      return (
        <View style={styles.mainContainter}>
          <View style={styles.loadingContainer}>
            <Spinner size={100} color={'#358ff4'} type={'Bounce'} />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.mainContainter}>
          <MapView style={styles.mapContainer}
            initialCenterCoordinate={this.state.coordinate}
            initialZoomLevel={15}
            showsUserLocation={true}
            styleURL={Mapbox.mapStyles.streets}
            annotations={this.state.annotations}
          />
          <View style={styles.saveContainer}>
            <View style={styles.placeContainer}>
              <View style={styles.placeIcon}>
                <Image source={icons.user}></Image>
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
              <View style={styles.placeIcon}>
                <Image source={icons.place}></Image>
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
            <TouchableOpacity style={styles.saveButton}
              onPress={() => this.onButtonSavePress(navigate)}>
              <Text style={styles.saveText}>
                SAVE
             </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  mainContainter: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  placeIcon: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeText: {
    flex: 0.85,
    color: '#000000',
    fontSize: 16,
    fontFamily: "Helvetica",
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