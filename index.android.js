import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './HomeScreen'
import SaveLocation from './SaveLocation'

const NeverForgotYourLocation = StackNavigator({
  Home: { screen: HomeScreen },
  SaveLocation: { screen: SaveLocation }
})

AppRegistry.registerComponent('NeverForgotYourLocation', () => NeverForgotYourLocation)