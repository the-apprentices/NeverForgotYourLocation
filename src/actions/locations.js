import { RECEIVE_LOCATIONS, ADD_LOCATION } from '../constants/ActionTypes'

export const receiveLocations = (locations) => ({
  type: RECEIVE_LOCATIONS,
  locations: locations
})