import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, TextInput } from 'react-native'
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

export default LocationTextInput = ({ icon, placeHolder, textValue, onChangeText }) => (
  <View style={styles.placeContainer}>
    <View style={styles.placeWrap}>
      <Image style={styles.placeIcon} source={icon}></Image>
    </View>
    <TextInput style={styles.placeText}
      autoCapitalize='words'
      placeholder={placeHolder}
      onChangeText={(textInput) => onChangeText(textInput)}
      multiline={false}
      underlineColorAndroid={'transparent'}
      value={textValue}
    />
  </View>
)
LocationTextInput.propTypes = {
  icon: PropTypes.number.isRequired,
  placeHolder: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
}