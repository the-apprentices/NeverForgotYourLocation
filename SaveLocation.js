import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native'
import Mapbox, { MapView } from 'react-native-mapbox-gl'

const accessToken = 'sk.eyJ1IjoiaGllcHZ2IiwiYSI6ImNqMXN5ZmJqNzAwMjMzMnJ6ZzR2d2huZWoifQ.LSja8rK5NJny2L0pGWLpfA'
Mapbox.setAccessToken(accessToken)

export default class SaveLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coordinate: {
        longitude: 0,
        latitude: 0
      },
      placeName: '',
      placeAddress: ''
    }
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let coordinate = {}
      coordinate.longitude = position.coords.longitude
      coordinate.latitude = position.coords.latitude
      this.setState({ coordinate })
      this._map.setCenterCoordinate(this.state.coordinate.latitude, this.state.coordinate.longitude, animated = true)
    },
      (error) => console.warn(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    )
  }
  onButtonPress() {
    let data = {
      coordinate: this.state.coordinate,
      placename: this.state.placeName,
      placeaddress: this.state.placeAddress
    }
    console.warn(JSON.stringify(data))
  }
  render() {
    console.warn(JSON.stringify(this.state.coordinate))
    return (
      <View style={styles.container}>
        <MapView style={styles.mapView}
          ref={map => { this._map = map }}
          initialCenterCoordinate={this.state.coordinate}
          initialZoomLevel={15}
          showsUserLocation={true}
          styleURL={Mapbox.mapStyles.streets}

        />
        <View style={styles.inforLocation}>
          <View style={styles.placeContainer}>
            <View style={styles.placeIcon}>
              <Image source={require('./src/imgs/user.png')}></Image>
            </View>
            <TextInput style={styles.placeName}
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
              <Image source={require('./src/imgs/placeholder.png')}></Image>
            </View>
            <TextInput style={styles.placeAddress}
              placeholder="Place address"
              onChangeText={(placeAddress) => this.setState({ placeAddress })}
              multiline={false}
              underlineColorAndroid={'transparent'}
              value={this.state.placeAddress}
            />
          </View>
        </View>
        <View style={styles.areaSave}>
          <TouchableOpacity style={styles.buttonSave} onPress={() => this.onButtonPress()}>
            <Text style={styles.labelSave}>
              SAVE
             </Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  },
  mapView: {
    flex: 1
  },
  inforLocation: {
    height: 121,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  placeContainer: {
    flexDirection: 'row'
  },
  placeIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeName: {
    flex: 0.9,
    color: '#000000',
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: 'normal',
    paddingLeft: 7
  },
  borderContainer: {
    flexDirection: 'row'
  },
  borderWhite: {
    flex: 0.1,
    height: 1,
    backgroundColor: '#FFFFFF'
  },
  borderView: {
    flex: 0.9,
    height: 1,
    backgroundColor: '#757575'
  },
  placeAddress: {
    flex: 0.9,
    color: '#000000',
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: 'normal',
    paddingLeft: 7
  },
  areaSave: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSave: {
    height: 60,
    minWidth: '100%',
    backgroundColor: '#FD482E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelSave: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: 'bold'
  }
})