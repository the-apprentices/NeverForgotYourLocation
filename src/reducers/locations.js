import { ADD_LOCATION, RECEIVE_LOCATIONS } from '../constants/ActionTypes'

const initialState = {
  isLoading: true,
  locations: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
      return {
        isLoading: false,
        locations: action.locations
      }
    default:
      return state
  }
}