import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, TouchableNativeFeedback, Keyboard } from 'react-native'
import { getAddress } from '../helpers/getData'
import { onChangeMode, onChangeCoordinate } from '../actions/saveScreen'
const icons = {
  back: require('../assets/imgs/back-left.png')
}
const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    width: 16,
    height: 16
  }
})

const onButtonPress = async (auth, uiState, goBack, justGoBack) => {
  if (justGoBack)
    return justGoBack()
  const { dispatch, isSavingMode } = uiState
  if (isSavingMode) {
    dispatch(onChangeMode(false, dispatch))
    Keyboard.dismiss()
  }
  else goBack()
}

const BackButton = ({ auth, uiState, goBack, justGoBack }) => (
  <TouchableNativeFeedback
    onPress={() => onButtonPress(auth, uiState, goBack, justGoBack)}
    background={TouchableNativeFeedback.Ripple('#adadad', true)}>
    <View style={styles.backButton}>
      <Image style={styles.backIcon} source={icons.back} />
    </View>
  </TouchableNativeFeedback>
)
BackButton.propTypes = {
  auth: PropTypes.object.isRequired,
  uiState: PropTypes.object.isRequired,
  goBack: PropTypes.func,
  justGoBack: PropTypes.func
}
const mapStateToProps = state => ({
  auth: state.auth.auth,
  uiState: state.saveScreen
})
export default connect(mapStateToProps)(BackButton)