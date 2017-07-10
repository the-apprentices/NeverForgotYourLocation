import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './src/screens/HomeScreen'
import SaveLocation from './src/screens/SaveLocation'
import VisitedLocations from './src/screens/VisitedLocations'
import EditLocation from './src/screens/EditLocation'

const NeverForgetYourLocation = StackNavigator({
  Home: { screen: HomeScreen },
  SaveLocation: { screen: SaveLocation },
  VisitedLocations: { screen: VisitedLocations },
  EditLocation: { screen: EditLocation}
})

AppRegistry.registerComponent('NeverForgetYourLocation', () => NeverForgetYourLocation)