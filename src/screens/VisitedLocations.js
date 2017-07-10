import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ViewPagerAndroid,
  Image,
  Text,
  ToastAndroid,
  Alert,
  TouchableNativeFeedback
} from 'react-native'

import SwitchButton from '../components/SwitchButton'
import FriendsListView from '../components/FriendsListView'
import ViewLocations from '../containers/ViewLocations'
import BackButton from '../components/BackButton'

import * as Handler from '../helpers/handleDataWithFirebase'

const icons = {
  search: require('../assets/imgs/search.png'),
  recycleBin: require('../assets/imgs/recycle-bin.png'),
  edit: require('../assets/imgs/pencil.png')
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
      keySelected: '',
      keyItemLongPressState: ''
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation
    if (!state.params.isLongPressState)
      return {
        title: 'VISITED LOCATIONS',
        headerRight: <View style={styles.searchWrap}>
          <TouchableNativeFeedback
            onPress={() => { }}
            background={TouchableNativeFeedback.Ripple('#adadad', true)}>
            <View style={styles.searchButton}>
              <Image style={styles.iconSize} source={icons.search} />
            </View>
          </TouchableNativeFeedback>
        </View>
      }
    else {
      return {
        title: '1 selected',
        headerStyle: { backgroundColor: '#1e8ef6' },
        headerRight: <View style={styles.editWrap}>
          <TouchableNativeFeedback
            onPress={() => state.params.onEditButtonPress(navigate, state.params.markerKey)}
            background={TouchableNativeFeedback.Ripple('#adadad', true)}>
            <View style={styles.editButton}>
              <Image style={styles.iconSize} source={icons.edit} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => Alert.alert(
              'Delete this location',
              'Are you sure?',
              [
                { text: 'Cancel', onPress: () => ToastAndroid.show('Cancelled!', ToastAndroid.SHORT) },
                {
                  text: 'OK', onPress: () => {
                    state.params.onDeleteButtonPress(state.params.markerKey)
                    setTimeout(() => ToastAndroid.show('Deleted!', ToastAndroid.SHORT), 500)
                    setParams({ isLongPressState: false })
                  }
                }
              ],
              { cancelable: false }
            )
            }
            background={TouchableNativeFeedback.Ripple('#adadad', true)}>
            <View style={styles.deleteButton}>
              <Image style={styles.iconSize} source={icons.recycleBin} />
            </View>
          </TouchableNativeFeedback>
        </View>
      }
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
  onChangeLongPressState(keyItemLongPressState) {
    this.setState({ keyItemLongPressState })
  }
  onDeleteButtonPress(markerKey) {
    let newListMarkers = this.state.listMarkers.filter(marker => marker.key != markerKey)
    this.setState({ listMarkers: newListMarkers })
    Handler.deleteMarker(this.currentUser.uid, markerKey)
  }
  onEditButtonPress(navigate, markerKey) {
    let marker = this.state.listMarkers.filter(marker => marker.key === markerKey)
    setTimeout(() => {
      navigate('EditLocation', { placeData: marker[0], onDoneButtonPress: this.onDoneButtonPress.bind(this) })
    }, 100)
  }
  onDoneButtonPress(markerKey, title, description) {
    Handler.updateMarkerInfo(this.currentUser.uid, markerKey, title, description)
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
    const { state, setParams } = this.props.navigation
    this.currentUser = state.params.currentUser
    return (
      <View style={styles.mainContainer}>
        <ViewPagerAndroid style={styles.viewPagerContainer}
          ref={(viewPager) => { this.viewPager = viewPager }}
          initialPage={this.leftPageState}
          onPageSelected={this.onPageSelected}>
          <View>
            <FriendsListView friendsList={this.state.listMarkers}
              keyItemLongPressState={this.state.keyItemLongPressState}
              onChangeLongPressState={this.onChangeLongPressState.bind(this)}
              onListViewElementSelected={this.onListViewElementSelected.bind(this)}
              setParams={setParams}
              onDeleteButtonPress={this.onDeleteButtonPress.bind(this)}
              onEditButtonPress={this.onEditButtonPress.bind(this)}
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
  iconSize: {
    width: 25,
    height: 25
  },
  editWrap: {
    flex: 1,
    flexDirection: 'row',
    width: 110,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editButton: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
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