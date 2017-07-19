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
export const saveLocation = (infor, callback) => {
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
    const newMarker = database.ref(infor.uid + '/markers').push()
    newMarker.set(marker)
    callback({ ...marker, key: `${infor.coordinate.latitude}${infor.coordinate.longitude}` })
  } catch (error) {
    console.warn(JSON.stringify(error))
    ToastAndroid.show('Please check your connection!', ToastAndroid.LONG)
  }
}