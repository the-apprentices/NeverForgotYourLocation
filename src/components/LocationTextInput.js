import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text } from 'react-native'
const styles = StyleSheet.create({
  placeContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 8
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
    marginLeft: 8,
    marginRight: 12
  },
  placeContent: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})

export default LocationTextInput = ({ icon, placeHolder, textValue, onChangeText }) => (
  <View style={styles.placeContainer}>
    <View style={styles.placeWrap}>
      <Image style={styles.placeIcon} source={icon}></Image>
    </View>
    <View style={styles.placeText}>
      <Text style={styles.placeContent}
        onPress={() => { }}>{textValue}
      </Text>
    </View>
  </View>
)
LocationTextInput.propTypes = {
  icon: PropTypes.number.isRequired,
  placeHolder: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
}