/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  Navigator,
  Text
} from 'react-native'

import MainScreen from './MainScreen'

const routes = [
  {index: 0 },
  {index: 1 }
]

export default class NeverForgotYourLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNavBar: false
    }
  }
  renderScene(route, navigator) {
    if (route.index === 0) return <MainScreen navigator={navigator} routes={routes} />
    if (route.index === 1) return <Text>Hehe</Text>
  }
  render() {
    if (this.state.showNavBar)
      return (
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={this.renderScene}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  return <Text>Cancel</Text>
                },
                RightButton: (route, navigator, index, navState) => {
                  return <Text>Done</Text>
                },
                Title: (route, navigator, index, navState) => {
                  return <Text>Awesome Nav Bar</Text>
                },
              }}
            />
          }
        />
      )
    else
      return (
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={this.renderScene}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
        />
      )
  }
}

AppRegistry.registerComponent('NeverForgotYourLocation', () => NeverForgotYourLocation)
