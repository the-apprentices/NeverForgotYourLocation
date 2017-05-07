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
    this.state = {
      pageNumber: 0,
      isLeft: true
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
  onPageSelected = (e) => {
    this.setState({
      pageNumber: e.nativeEvent.positon
    })
  }
  onSwitchButtonPress(buttonState) {
    this.setState({
      isLeft: buttonState
    })
    this.onSwitchButtonSelected()
  }
  onSwitchButtonSelected() {
    if (this.state.isLeft) {
      this.viewPager.setPage(0)
    } else {
      this.viewPager.setPage(1)
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ViewPagerAndroid style={styles.viewPagerContainer}
          ref={(viewPager) => { this.viewPager = viewPager }}
          initialPage={0}
          onPageSelected={this.onPageSelected}>
          <View>
            <ViewLocations />
          </View>
          <View>
            <ViewFriends />
          </View>
        </ViewPagerAndroid>
        <View style={styles.switchButtonContainer}>
          <SwitchButton onSwitchButtonPress={this.onSwitchButtonPress.bind(this)}
          />
        </View>
      </View>
    )
  }
}

