import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ViewPagerAndroid,
  Image,
  Text,
  ToastAndroid,
  TouchableNativeFeedback
} from 'react-native'

import SwitchButton from '../components/SwitchButton'
import FriendsListView from '../components/FriendsListView'
import ViewLocations from '../containers/ViewLocations'

import * as Handler from '../helpers/handleDataWithFirebase'

const icons = {
  search: require('../assets/imgs/search.png')
}
const DEFAULT_LATITUDE_DELTA = 0.005
const DEFAULT_LONGITUDE_DELTA = 0.001

export default class VisitedLocations extends Component {
  constructor(props) {
    super(props)
    this.leftPageState = 0
    this.rightPageState = 1
    this.state = {
      leftButtonBackgroundColor: '#FD482E',
      rightButtonBackgroundColor: '#D7D8DA',
      leftButtonTextColor: '#ffffff',
      rightButtonTextColor: '#FD482E',
      listMarkers: [],
      region: null,
      keySelected: ''
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'VISITED LOCATIONS',
      headerRight: <View style={styles.searchWrap}>
        <TouchableNativeFeedback
          onPress={() => { }}
          background={TouchableNativeFeedback.Ripple('#adadad', true)}>
          <View style={styles.searchButton}>
            <Image style={styles.searchIcon} source={icons.search} />
          </View>
        </TouchableNativeFeedback>
      </View>
    }
  }
  changeLeftButtonState() {
    this.setState({
      leftButtonBackgroundColor: '#FD482E',
      rightButtonBackgroundColor: '#D7D8DA',
      leftButtonTextColor: '#ffffff',
      rightButtonTextColor: '#FD482E'
    })
  }
  changeRightButtonState() {
    this.setState({
      leftButtonBackgroundColor: '#D7D8DA',
      rightButtonBackgroundColor: '#FD482E',
      leftButtonTextColor: '#FD482E',
      rightButtonTextColor: '#ffffff'
    })
  }
  changeLeftButtonStateWhenClick(buttonLeftState) {
    if (buttonLeftState) {
      this.viewPager.setPage(this.leftPageState)
      this.changeLeftButtonState()
    } else {
      this.viewPager.setPage(this.rightPageState)
      this.changeRightButtonState()
    }
  }
  onPageSelected = (e) => {
    if (e.nativeEvent.position === this.leftPageState) {
      this.changeLeftButtonState()
    } else {
      this.changeRightButtonState()
    }
  }
  onListViewElementSelected(coordinate, keySelected) {
    this.mapView.animateToCoordinate(coordinate)
    this.changeLeftButtonStateWhenClick(false)
    this.setState({ keySelected })
  }
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LONGITUDE_DELTA
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
  getAllMarkers = async () => {
    let listMarkers = await Handler.getAllMarkerData(this.currentUser.uid)
    this.setState({ listMarkers })
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

  render() {
    const { state } = this.props.navigation
    this.currentUser = state.params.currentUser
    return (
      <View style={styles.mainContainer}>
        <ViewPagerAndroid style={styles.viewPagerContainer}
          ref={(viewPager) => { this.viewPager = viewPager }}
          initialPage={this.leftPageState}
          onPageSelected={this.onPageSelected}>
          <View>
            <FriendsListView friendsList={this.state.listMarkers}
              onListViewElementSelected={this.onListViewElementSelected.bind(this)}
            />
          </View>
          <View>
            <ViewLocations mapRef={mapView => { this.mapView = mapView }}
              region={this.state.region}
              listMarkers={this.state.listMarkers}
              keySelected={this.state.keySelected}
            />
          </View>
        </ViewPagerAndroid>
        <View style={styles.switchButtonContainer}>
          <SwitchButton
            leftButtonBackgroundColor={this.state.leftButtonBackgroundColor}
            rightButtonBackgroundColor={this.state.rightButtonBackgroundColor}
            leftButtonTextColor={this.state.leftButtonTextColor}
            rightButtonTextColor={this.state.rightButtonTextColor}
            onSwitchButtonPress={this.changeLeftButtonStateWhenClick.bind(this)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchWrap: {
    flex: 1,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchIcon: {
    width: 25,
    height: 25
  },
  mainContainer: {
    flex: 1
  },
  viewPagerContainer: {
    flex: 1
  },
  switchButtonContainer: {
    position: 'absolute',
    top: 0,
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})