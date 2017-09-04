import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TextInput } from 'react-native'
import BackButton from '../components/BackButton'
import CardView from 'react-native-cardview'
const styles = StyleSheet.create({
  editorInforContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 8,
    borderRadius: 2,
  },
  iconContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editorContainer: {
    flex: 0.85,
    paddingRight: 8
  },
  editorContent: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})
export default EditorInformation = ({ goBack, placeHolder, onChangeText, textValue }) => (
  <CardView style={styles.editorInforContainer}
    cardElevation={3}
    cardMaxElevation={0}
    cornerRadius={2}>
    <View style={styles.iconContainer}>
      <BackButton justGoBack={goBack} />
    </View>
    <View style={styles.editorContainer}>
      <TextInput style={styles.editorContent}
        autoCapitalize='words'
        placeholder={placeHolder}
        onChangeText={(textInput) => { onChangeText(textInput) }}
        multiline={false}
        underlineColorAndroid={'transparent'}
        value={textValue} />
    </View>
  </CardView>
)
EditorInformation.propTypes = {
  goBack: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired
}