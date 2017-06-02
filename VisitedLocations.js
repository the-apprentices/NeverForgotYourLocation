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
import { NavigationActions } from 'react-navigation'
import Helpers from './src/helpers/handleData'

import SwitchButton from './SwitchButton'
import ViewFriends from './ViewFriends'
import ViewLocations from './ViewLocations'

const goToHome = NavigationActions.back({
  routeName: 'Home'
})

const icons = {
  home: require('./src/assets/imgs/home.png'),
  search: require('./src/assets/imgs/search.png')
}

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    width: 30,
    height: 30
  },
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
      listAnnotationData: [],
      coordinate: null,
      selectedAnnotationId: null,
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'VISITED LOCATIONS',
      headerLeft: <TouchableNativeFeedback
        onPress={() => navigation.dispatch(goToHome)}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.backButton}>
          <Image style={styles.backIcon} source={icons.home} />
        </View>
      </TouchableNativeFeedback>,
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
  changeButtonStateWhenClick(buttonLeftState) {
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
  onListViewElementSelected(coordinate, selectedAnnotationId) {
    this.setState({ coordinate, selectedAnnotationId })
    this.changeButtonStateWhenClick(false)
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
  }
  getFriendData = async () => {
    let friends = await Helpers.getAllFriends()
    return friends
  }
  getAnnotationData = async () => {
    let annotations = await Helpers.getAllAnnotations()
    return annotations
  }
  componentDidMount() {
    this.getCurrentLocation()
    this.getFriendData()
      .then((listFriendData) => {
        this.setState({ listFriendData })
        return this.getAnnotationData()
      })
      .then((listAnnotationData) => this.setState({ listAnnotationData }))
      .catch((err) => ToastAndroid.show('Can not get your location', ToastAndroid.LONG))
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
              selectedAnnotationId={this.state.selectedAnnotationId}
              annotations={this.state.listAnnotationData}
            />
          </View>
        </ViewPagerAndroid>
        <View style={styles.switchButtonContainer}>
          <SwitchButton
            leftButtonBackgroundColor={this.state.leftButtonBackgroundColor}
            rightButtonBackgroundColor={this.state.rightButtonBackgroundColor}
            leftButtonTextColor={this.state.leftButtonTextColor}
            rightButtonTextColor={this.state.rightButtonTextColor}
            onSwitchButtonPress={this.changeButtonStateWhenClick.bind(this)}
          />
        </View>
      </View>
    )
  }
}