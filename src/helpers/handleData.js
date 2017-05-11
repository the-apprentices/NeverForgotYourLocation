import {
  AsyncStorage
} from 'react-native'

const handleData = {
  clearAllData: async () => {
    await AsyncStorage.clear((err) => { })
  },
  getAllKeys: async () => {
    let keys = await AsyncStorage.getAllKeys((err, keys) => keys)
    return keys
  },
  getAllData: async (keys) => {
    let data = await AsyncStorage.multiGet(keys, (err, data) => data)
    return data
  },
  getData: async (uid) => {
    let data = await AsyncStorage.getItem(uid, (err, data) => data)
    return data
  },
  saveData: async (uid, data) => {
    await AsyncStorage.setItem(uid, JSON.stringify(data))
  }
}

export default Helpers = {
  saveCurrentLocation: async (data) => {
    let uid = data.coordinate.latitude.toString() + data.coordinate.longitude.toString()
    let dataToSave = {
      coordinate: data.coordinate,
      placeName: data.placeName,
      placeAddress: data.placeAddress,
      createAt: Date.now()
    }
    await handleData.saveData(uid, dataToSave)
    return uid
  },
  getNewAnnotation: async (uid) => {
    let data = await handleData.getData(uid)
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
    let keys = await handleData.getAllKeys()
    let data = await handleData.getAllData(keys)
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
    let keys = await handleData.getAllKeys()
    let data = await handleData.getAllData(keys)
    let friends = []
    data.map((result, idx, location) => {
      let dataFriend = JSON.parse(location[idx][1])
      let friend = {
        coordinate: dataFriend.coordinate,
        title: dataFriend.placeName,
        subtitle: dataFriend.placeAddress,
        createAt: dataFriend.createAt,
        id: location[idx][0]
      }
      friends.push(friend)
    })
    return friends
  },
  clearAllData: async () => {
    await handleData.clearAllData()
  }
}