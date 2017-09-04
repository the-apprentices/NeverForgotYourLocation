import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableNativeFeedback, Image, Text } from 'react-native'
const styles = StyleSheet.create({
  placeContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 8
  },
  placeWrap: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeIcon: {
    width: 24,
    height: 24
  },
  placeText: {
    flex: 0.9,
    marginLeft: 4,
    marginRight: 8,
    justifyContent: 'center'
  },
  placeContent: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})

export default LocationTextInput = ({ icon, placeHolder, textValue, suggestionList, onChangeText, navigation }) => (
  <TouchableNativeFeedback
    onPress={() => {
      navigation.dispatch({
        type: 'SuggestionScreen',
        params: {
          placeHolder: placeHolder,
          textValue: textValue,
          suggestionList: suggestionList,
          onChangeText: onChangeText
        }
      })
    }}
    background={TouchableNativeFeedback.Ripple('#adadad', false)}>
    <View style={styles.placeContainer}>
      <View style={styles.placeWrap}>
        <Image style={styles.placeIcon} source={icon}></Image>
      </View>
      <View style={styles.placeText}>
        <Text style={styles.placeContent}>
          {textValue}
        </Text>
      </View>
    </View>
  </TouchableNativeFeedback>
)
LocationTextInput.propTypes = {
  icon: PropTypes.number.isRequired,
  placeHolder: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
  suggestionList: PropTypes.array.isRequired,
  onChangeText: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}