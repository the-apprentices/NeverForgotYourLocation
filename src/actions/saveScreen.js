import { CHANGE_MODE, CHANGE_NAME, CHANGE_ADDRESS, CHANGE_COORDINATE } from '../constants/ActionTypes'

export const onChangeMode = (isSavingMode, dispatch) => ({
  type: CHANGE_MODE,
  isSavingMode,
  dispatch
})
export const onChangeCoordinate = (targetCoordinate, listPlaceName, listPlaceAddress) => ({
  type: CHANGE_COORDINATE,
  targetCoordinate,
  listPlaceName,
  listPlaceAddress
})
export const onChangePlaceName = (placeName) => ({
  type: CHANGE_NAME,
  placeName
})
export const onChangePlaceAddress = (placeAddress) => ({
  type: CHANGE_ADDRESS,
  placeAddress
})
