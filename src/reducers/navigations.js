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
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break
  }
  return nextState || state
}

export default nav