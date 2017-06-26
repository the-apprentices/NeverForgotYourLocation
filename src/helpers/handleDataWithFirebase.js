import { writeMarkerData, readAllMarkerData } from './connectWithFirebase'

const saveMarkerData = (userId, newMarker) => {
  let marker = {
    coordinate: {
      latitude: newMarker.coordinate.latitude,
      longitude: newMarker.coordinate.longitude
    },
    title: newMarker.title,
    description: newMarker.description,
    createAt: Date.now()
  }
  writeMarkerData(userId, marker)
}

const getAllMarkerData = (userId) => {
  return readAllMarkerData(userId)
}

export { saveMarkerData, getAllMarkerData }