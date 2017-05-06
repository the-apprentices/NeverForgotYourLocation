import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableNativeFeedback
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { TabNavigator } from 'react-navigation'

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
  }
})

export default class VisitedLocations extends Component {
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
  render() {
    return (
      <View></View>
    )
  }
}