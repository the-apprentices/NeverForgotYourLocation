import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import { getCurrentAuth } from './src/actions'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { AppRegistry } from 'react-native'
import AppNavigator from './src/navigators/AppNavigator'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
store.dispatch(getCurrentAuth())

export default class NeverForgetYourLocation extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('NeverForgetYourLocation', () => NeverForgetYourLocation)