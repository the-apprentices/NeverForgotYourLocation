import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCSJfduUZ6QuHMCZIN9kA8OXAKuNDWUheM',
  authDomain: 'neverforgetyourlocation.firebaseapp.com',
  databaseURL: 'https://neverforgetyourlocation.firebaseio.com'
}
const firebaseRef = firebase.initializeApp(config)
const database = firebase.database()

const authWithFirebase = (accessToken) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken)
  return firebase.auth().signInWithCredential(credential)
}

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user)
    })
  })
}

const signOut = () => {
  return firebase.auth().signOut()
    .catch(function (error) {
      throw Error()
    })
}

const writeMarkerData = (userId, data) => {
  const newMarker = database.ref(userId + '/markers').push()
  newMarker.set(data)
}

const readAllMarkerData = (userId) => {
  return new Promise((resolve, reject) => {
    database.ref(userId + '/markers').on('value', (snapshot) => {
      let listMarkers = []
      snapshot.forEach((marker) => {
        listMarkers.push({
          key: marker.key,
          coordinate: marker.val().coordinate,
          title: marker.val().title,
          description: marker.val().description,
          createAt: marker.val().createAt
        })
      })
      resolve(listMarkers)
    })
  })
}

export { authWithFirebase, getCurrentUser, signOut, writeMarkerData, readAllMarkerData }