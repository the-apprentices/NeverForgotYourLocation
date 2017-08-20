import { CHANGE_MODE, CHANGE_NAME, CHANGE_ADDRESS, CHANGE_COORDINATE } from '../constants/ActionTypes'

export const onChangeMode = (isSavingMode, dispatch) => ({
  type: CHANGE_MODE,
  isSavingMode,
  dispatch
})
export const onChangeCoordinate = (targetCoordinate, placeName, placeAddress) => ({
  type: CHANGE_COORDINATE,
  targetCoordinate,
  placeName,
  placeAddress
})
export const onChangePlaceName = (placeName) => ({
  type: CHANGE_NAME,
  placeName
})
export const onChangePlaceAddress = (placeAddress) => ({
  type: CHANGE_ADDRESS,
  placeAddress
})
