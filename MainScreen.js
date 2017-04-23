import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native'

export default class MainScreen extends Component {
  onButtonPress() {
    Alert.alert('Hihi')
  }
  onButtonSavePress() {
    this.props.navigator.push(this.props.routes[1])
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.areaLogo}>
          <Image source={require('./src/imgs/map.png')} />
        </View>
        <View style={styles.areaLogin}>
          <TouchableOpacity style={styles.blockLogin} onPress={this.onButtonPress}>
            <View style={styles.buttonLogin}>
              <Image style={styles.iconface} source={require('./src/imgs/facebook-logo.png')}></Image>
              <Text style={styles.labelLogin}>
                LOG IN WITH FACEBOOK
             </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.areaSave}>
          <TouchableOpacity style={styles.buttonSave} onPress={() => this.onButtonSavePress()}>
            <Text style={styles.labelSave}>
              SAVE LOCATION
             </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.areaPlace}>
          <TouchableOpacity style={styles.buttonPlace} onPress={this.onButtonPress}>
            <Text style={styles.labelPlace}>
              VISITED PLACES
             </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F1F5F6',
  },
  areaLogo: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  areaLogin: {
    flex: 0.4,
    alignItems: 'center',
  },
  blockLogin: {
    height: 60,
    backgroundColor: '#43619D',
    justifyContent: 'center',
    minWidth: '80%'
  },
  buttonLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconface: {
    // marginLeft: 20,
    // marginRight: 30
  },
  labelLogin: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: 'bold',
    marginRight: 30
  },
  areaSave: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSave: {
    height: 60,
    minWidth: '80%',
    backgroundColor: '#FD482E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelSave: {
    color: '#F1F5F6',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: 'bold'
  },
  areaPlace: {
    flex: 0.15,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  buttonPlace: {
    height: 60,
    minWidth: '80%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FD482E',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelPlace: {
    color: '#FD482E',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: 'bold'
  },
})