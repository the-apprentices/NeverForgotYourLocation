import { ToastAndroid } from 'react-native'
import firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyCSJfduUZ6QuHMCZIN9kA8OXAKuNDWUheM',
  authDomain: 'neverforgetyourlocation.firebaseapp.com',
  databaseURL: 'https://neverforgetyourlocation.firebaseio.com'
}
const firebaseRef = firebase.initializeApp(config)
const database = firebase.database()

export const getLocations = (userId, callback) => {
  try {
    new Promise(() => {
      database.ref(userId + '/markers').on('value', (snapshot) => {
        let listMarkers = []
        snapshot.forEach((marker) => {
          if (marker.val().visible)
            listMarkers = [
              {
                key: marker.key,
                coordinate: marker.val().coordinate,
                title: marker.val().title,
                description: marker.val().description,
                createAt: marker.val().createAt,
                visible: marker.val().visible
              },
              ...listMarkers
            ]
        })
        callback(listMarkers)
      })
    })
  } catch (error) {
    ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
  }
}
export const saveLocation = (infor) => {
  try {
    const marker = {
      coordinate: {
        latitude: infor.coordinate.latitude,
        longitude: infor.coordinate.longitude
      },
      title: infor.title,
      description: infor.description,
      createAt: Date.now(),
      visible: true
    }
    const newMarker = database.ref(infor.userId + '/markers').push()
    newMarker.set(marker)
  } catch (error) {
    ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
  }
}
export const invisibleLocation = (infor) => {
  try {
    database.ref(infor.userId + '/markers/' + infor.markerKey).update({ visible: false })
  } catch (error) {
    ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
  }
}
export const editLocation = (infor) => {
  try {
    database.ref(infor.userId + '/markers/' + infor.markerKey).update({
      title: infor.title,
      description: infor.description
    })
  } catch (error) {
    ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
  }
}