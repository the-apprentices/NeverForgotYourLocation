import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ViewPagerAndroid,
  Image,
  Text,
  TouchableNativeFeedback
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { TabNavigator } from 'react-navigation'

import SwitchButton from './SwitchButton'
import ViewFriends from './ViewFriends'
import ViewLocations from './ViewLocations'

const goToHome = NavigationActions.navigate({
  routeName: 'Home'
})

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    width: 60,
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

export default class VisitedLocations extends Component {
  constructor(props) {
    super(props)
    this.leftPageState = 0
    this.rightPageState = 1
    this.state = {
      leftButtonBackgroundColor: '#FD482E',
      rightButtonBackgroundColor: '#D7D8DA',
      leftButtonTextColor: '#ffffff',
      rightButtonTextColor: '#FD482E'
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'VISITED LOCATIONS',
      headerLeft: <TouchableNativeFeedback
        onPress={() => navigation.dispatch(goToHome)}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.backButton}>
          <Image source={require('./src/assets/imgs/home.png')} />
        </View>
      </TouchableNativeFeedback>,
      headerRight: <TouchableNativeFeedback
        onPress={() => navigation.dispatch(goToHome)}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.backButton}>
          <Image source={require('./src/assets/imgs/search.png')} />
        </View>
      </TouchableNativeFeedback>
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
  chanRightButtonState() {
    this.setState({
        leftButtonBackgroundColor: '#D7D8DA',
        rightButtonBackgroundColor: '#FD482E',
        leftButtonTextColor: '#FD482E',
        rightButtonTextColor: '#ffffff'
      })
  }
  onPageSelected = (e) => {
    if (e.nativeEvent.position === this.leftPageState) {
      this.changeLeftButtonState()
    } else {
      this.chanRightButtonState()
    }
  }
  changeButtonStateWhenClick(buttonLeftState) {
    if (buttonLeftState) {
      this.viewPager.setPage(this.leftPageState)
      this.changeLeftButtonState()
    } else {
      this.viewPager.setPage(this.rightPageState)
      this.chanRightButtonState()
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ViewPagerAndroid style={styles.viewPagerContainer}
          ref={(viewPager) => { this.viewPager = viewPager }}
          initialPage={this.leftPageState}
          onPageSelected={this.onPageSelected}>
          <View>
            <ViewFriends />
          </View>
          <View>
            <ViewLocations />
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