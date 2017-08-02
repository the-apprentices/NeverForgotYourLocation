import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigators/AppNavigator'

const firstAction = AppNavigator.router.getActionForPathAndParams('Home')
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
)

function nav(state = initialNavState, action) {
  let nextState
  switch (action.type) {
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      )
      break
    case 'SaveLocation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'SaveLocation',
          params: {
            isSavingMode: false,
            displayWrapperInfor: 'none',
            displaySaveButton: 'flex',
            targetCoordinate: null,
            placeName: '',
            placeAddress: ''
          }
        }),
        state
      )
      break
    case 'VisitedLocations':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'VisitedLocations', params: { edited: false } }),
        state
      )
      break
    case 'EditLocation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'EditLocation',
          params: {
            ...action.params,
            title: action.params.oldTitle,
            description: action.params.oldDescription
          }
        }),
        state
      )
      break
    case 'BackAfterEdit':
      console.warn('ji')
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back({ routeName: 'VisitedLocations', params: { edited: true } }),
        state
      )
      break
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break
  }
  return nextState || state
}

export default nav