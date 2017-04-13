/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'

import MainScreen from './MainScreen'

export default class NeverForgotYourLocation extends Component {
  render() {
    return (
      <MainScreen />
    )
  }
}

AppRegistry.registerComponent('NeverForgotYourLocation', () => NeverForgotYourLocation)
