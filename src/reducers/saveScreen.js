import { CHANGE_MODE, CHANGE_NAME, CHANGE_ADDRESS, CHANGE_COORDINATE } from '../constants/ActionTypes'

const initialUiState = {
  isSavingMode: false,
  targetCoordinate: null,
  placeName: '',
  placeAddress: '',
  dispatch: null
}

export default (state = initialUiState, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return {
        ...state,
        isSavingMode: action.isSavingMode,
        dispatch: action.dispatch
      }
    case CHANGE_NAME:
      return {
        ...state,
        placeName: action.placeName
      }
    case CHANGE_ADDRESS:
      return {
        ...state,
        placeAddress: action.placeAddress
      }
    case CHANGE_COORDINATE:
      return {
        ...state,
        targetCoordinate: action.targetCoordinate,
        placeName: action.placeName,
        placeAddress: action.placeAddress
      }
    default:
      return state
  }
}