import { RECEIVE_LOCATIONS, ADD_LOCATION } from '../constants/ActionTypes'

export const receiveLocations = (locations) => ({
  type: RECEIVE_LOCATIONS,
  locations: locations
})
export const addLocation = (location) => ({
  type: ADD_LOCATION,
  location: location
})