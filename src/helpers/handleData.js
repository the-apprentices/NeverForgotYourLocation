import {
  AsyncStorage
} from 'react-native'

const colours = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
  '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
  '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400',
  '#c0392b', '#bdc3c7', '#7f8c8d']

clearAllData = async () => {
  await AsyncStorage.clear((err) => { })
}
getAllKeys = async () => {
  let keys = await AsyncStorage.getAllKeys((err, keys) => keys)
  return keys
}
getAllData = async (keys) => {
  let data = await AsyncStorage.multiGet(keys, (err, data) => data)
  return data
}
getData = async (uid) => {
  let data = await AsyncStorage.getItem(uid, (err, data) => data)
  return data
}
saveData = async (uid, data) => {
  await AsyncStorage.setItem(uid, JSON.stringify(data))
}
sortListByDate = (listData) => {
  return listData.sort((a, b) => {
    return (b.createAt - a.createAt)
  })
}
twoNumberFormat = (numberFormat) => {
  if (numberFormat.length > 1) return numberFormat
  else return '0' + numberFormat
}
formatDateTime = (dateTime) => {
  let getDateTime = new Date(dateTime)
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let month = months[getDateTime.getMonth()]
  let date = twoNumberFormat(getDateTime.getDate().toString())
  let hours = twoNumberFormat(getDateTime.getHours().toString())
  let minutes = twoNumberFormat(getDateTime.getMinutes().toString())
  return month + ' ' + date + ', ' + hours + ':' + minutes
}
getAvatarLetter = (name) => {
  let color = colours[Math.floor(Math.random() * 19)]
  let letter = name.charAt(0).toUpperCase()
  return {
    color: color,
    letter: letter
  }
}

export default Helpers = {
  saveCurrentLocation: async (data) => {
    let uid = data.coordinate.latitude.toString() + data.coordinate.longitude.toString()
    let dataToSave = {
      coordinate: data.coordinate,
      placeName: data.placeName,
      placeAddress: data.placeAddress,
      avatar: getAvatarLetter(data.placeName),
      createAt: Date.now()
    }
    await saveData(uid, dataToSave)
    return uid
  },
  getNewAnnotation: async (uid) => {
    let data = await getData(uid)
    let dataAnnotation = JSON.parse(data)
    let annotation = {
      coordinates: Object.keys(dataAnnotation.coordinate).map(key => dataAnnotation.coordinate[key]),
      type: 'point',
      title: dataAnnotation.placeName,
      subtitle: dataAnnotation.placeAddress,
      id: uid
    }
    return annotation
  },
  getAllAnnotations: async () => {
    let keys = await getAllKeys()
    let data = await getAllData(keys)
    let annotations = []
    data.map((result, idx, location) => {
      let dataAnnotation = JSON.parse(location[idx][1])
      let annotation = {
        coordinates: Object.keys(dataAnnotation.coordinate).map(key => dataAnnotation.coordinate[key]),
        type: 'point',
        title: dataAnnotation.placeName,
        subtitle: dataAnnotation.placeAddress,
        id: location[idx][0]
      }
      annotations.push(annotation)
    })
    return annotations
  },
  getAllFriends: async () => {
    let keys = await getAllKeys()
    let data = await getAllData(keys)
    let friends = []
    data.map((result, idx, location) => {
      let dataFriend = JSON.parse(location[idx][1])
      let friend = {
        coordinate: dataFriend.coordinate,
        title: dataFriend.placeName,
        subtitle: dataFriend.placeAddress,
        createAt: dataFriend.createAt,
        avatar: dataFriend.avatar
      }
      friends.push(friend)
    })
    let friendsListSorted = sortListByDate(friends)
    return friendsListSorted.map((data) => {
      return Object.assign({}, {
        coordinate: data.coordinate,
        title: data.title,
        subtitle: data.subtitle,
        createAt: formatDateTime(data.createAt),
        avatar: data.avatar
      })
    })
  },
  clearAllData: async () => {
    await clearAllData()
  }
}