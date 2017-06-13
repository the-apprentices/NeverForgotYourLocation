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
import Helpers from './src/helpers/handleData'

import SwitchButton from './SwitchButton'
import ViewFriends from './ViewFriends'
import ViewLocations from './ViewLocations'

const icons = {
  search: require('./src/assets/imgs/search.png')
}

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
      listFriendData: [],
      listMarkerData: [],
      coordinate: null
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
  onListViewElementSelected(coordinate) {
    this.setState({ coordinate })
    this.changeLeftButtonStateWhenClick(false)
  }
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coordinate: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
    },
      (error) => ToastAndroid.show('Can not get your location', ToastAndroid.LONG)
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        coordinate: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
    })
  }
  getFriendData = async () => {
    let friends = await Helpers.getAllFriends()
    return friends
  }
  getAllMarkers = async () => {
    let markers = await Helpers.getAllMarkers()
    return markers
  }
  componentDidMount() {
    this.getCurrentLocation()
    this.getFriendData()
      .then((listFriendData) => this.setState({ listFriendData }))
    this.getAllMarkers()
      .then((listMarkerData) => this.setState({ listMarkerData }))
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ViewPagerAndroid style={styles.viewPagerContainer}
          ref={(viewPager) => { this.viewPager = viewPager }}
          initialPage={this.leftPageState}
          onPageSelected={this.onPageSelected}>
          <View>
            <ViewFriends listFriendData={this.state.listFriendData}
              onListViewElementSelected={this.onListViewElementSelected.bind(this)}
            />
          </View>
          <View>
            <ViewLocations coordinate={this.state.coordinate}
              markers={this.state.listMarkerData}
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