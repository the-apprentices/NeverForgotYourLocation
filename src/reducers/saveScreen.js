import { CHANGE_MODE, CHANGE_NAME, CHANGE_ADDRESS, CHANGE_COORDINATE } from '../constants/ActionTypes'

const initialUiState = {
  isSavingMode: false,
  targetCoordinate: null,
  placeName: '',
  listPlaceName: [],
  placeAddress: '',
  listPlaceAddress: [],
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
        placeName: action.listPlaceName[0],
        listPlaceName: action.listPlaceName,
        placeAddress: action.listPlaceAddress[0],
        listPlaceAddress: action.listPlaceAddress
      }
    default:
      return state
  }
}