import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './src/screens/HomeScreen'
import SaveLocation from './SaveLocation'
import VisitedLocations from './VisitedLocations'

const NeverForgetYourLocation = StackNavigator({
  Home: { screen: HomeScreen },
  SaveLocation: { screen: SaveLocation },
  VisitedLocations: { screen: VisitedLocations }
})

AppRegistry.registerComponent('NeverForgetYourLocation', () => NeverForgetYourLocation)