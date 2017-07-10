import {
  writeMarkerData,
  readAllMarkerData,
  updateMarkerDataInvisible,
  updateMarkerDataInfor
} from './connectWithFirebase'

const saveMarkerData = (userId, newMarker) => {
  let marker = {
    coordinate: {
      latitude: newMarker.coordinate.latitude,
      longitude: newMarker.coordinate.longitude
    },
    title: newMarker.title,
    description: newMarker.description,
    createAt: Date.now(),
    visible: true
  }
  writeMarkerData(userId, marker)
}
const getAllMarkerData = (userId) => {
  return readAllMarkerData(userId)
}
const deleteMarker = (userId, markerKey) => {
  return updateMarkerDataInvisible(userId, markerKey)
}
const updateMarkerInfo = (userId, markerKey, title, description) => {
  return updateMarkerDataInfor(userId, markerKey, title, description)
}

export { saveMarkerData, getAllMarkerData, deleteMarker, updateMarkerInfo }