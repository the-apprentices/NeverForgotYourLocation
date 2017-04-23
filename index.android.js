import React, { Component } from 'react'
import {
  StyleSheet,
  AppRegistry,
  Navigator
} from 'react-native'

import { LeftButton, RightButton, Title } from './NavigationBar'
import MainScreen from './MainScreen'
import SaveLocation from './SaveLocation'

const routes = [
  { index: 0 },
  { index: 1 }
]

export default class NeverForgotYourLocation extends Component {
  constructor(props) {
    super(props)
  }
  renderScene(route, navigator) {
    switch (route.index) {
      case 0:
        return <MainScreen
          navigator={navigator}
          routes={routes}
        />
        break
      case 1:
        return <SaveLocation
          navigator={navigator}
          routes={routes} />
        break
      case 2:
        break
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump}
        navigationBar={
          <Navigator.NavigationBar style={styles.navigationBar}
            routeMapper={{
              LeftButton,
              RightButton,
              Title
            }}
          />
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  navigationBar: {
    height: 60,
    // backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
})


AppRegistry.registerComponent('NeverForgotYourLocation', () => NeverForgotYourLocation)