import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput
} from 'react-native'

const styles = StyleSheet.create({
  placeContainer: {
    flexDirection: 'row'
  },
  placeWrap: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeIcon: {
    width: 30,
    height: 30
  },
  placeText: {
    flex: 0.85,
    color: '#000000',
    fontSize: 16,
    fontWeight: 'normal',
    paddingLeft: 7,
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})

export default class LocationTextInput extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    icon: PropTypes.number.isRequired,
    placeHolder: PropTypes.string.isRequired,
    textValue: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
  }

  onChangeText(textInput) {
    this.props.onChangeText(textInput)
  }

  render() {
    return (
      <View style={styles.placeContainer}>
        <View style={styles.placeWrap}>
          <Image style={styles.placeIcon} source={this.props.icon}></Image>
        </View>
        <TextInput style={styles.placeText}
          placeholder={this.props.placeHolder}
          onChangeText={(textInput) => this.onChangeText(textInput)}
          multiline={false}
          underlineColorAndroid={'transparent'}
          value={this.props.textValue}
        />
      </View>
    )
  }
}