import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

function LeftButton(route, navigator, index, navState) {
  if (index === 0)
    return null
  else
    return (
      <View style={styles.labelLeft}>
        <TouchableOpacity style={styles.buttonLeft} onPress={() => {
            navigator.pop()
          }}>
          <Image source={require('./src/imgs/arrow_back.png')}></Image>
        </TouchableOpacity>
        </View>
    )
}
function RightButton(route, navigator, index, navState) {
  if ((index === 0) || (index === 1))
    return null
  else
    return <Text>Done</Text>
}
function Title(route, navigator, index, navState) {
  if (index === 0)
    return null
  else
    return (
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>SAVE LOCATION</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  labelLeft: {
    flex: 1,
    minWidth: '15%',
    backgroundColor: '#FFFFFF'
  },
  buttonLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  titleBar: {
    flex: 1,
    minWidth: '80%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900'
  }
})

export { LeftButton, RightButton, Title }