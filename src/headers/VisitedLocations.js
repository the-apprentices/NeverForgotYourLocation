import React from 'react'
import { StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native'
const icons = {
  search: require('../assets/imgs/search.png')
}
const styles = StyleSheet.create({
  searchWrap: {
    flex: 1,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconSize: {
    width: 25,
    height: 25
  }
})
export default ({ navigation }) => {
  return {
    title: 'VISITED LOCATIONS',
    headerRight: <View style={styles.searchWrap}>
      <TouchableNativeFeedback
        onPress={() => { console.warn(a); a = true }}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.searchButton}>
          <Image style={styles.iconSize} source={icons.search} />
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}