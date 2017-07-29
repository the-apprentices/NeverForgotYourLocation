import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import SaveLocation from '../screens/SaveLocation'
import VisitedLocations from '../screens/VisitedLocations'
import EditLocation from '../screens/EditLocation'

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  SaveLocation: { screen: SaveLocation },
  VisitedLocations: { screen: VisitedLocations },
  // EditLocation: { screen: EditLocation }
})
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)
AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)