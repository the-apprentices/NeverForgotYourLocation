import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback
} from 'react-native'

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

export default class BackButton extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    onButtonPress: PropTypes.func.isRequired
  }

  onButtonPress() {
    this.props.onButtonPress()
  }
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => this.onButtonPress()}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.backButton}>
          <Image style={styles.backIcon} source={icons.back} />
        </View>
      </TouchableNativeFeedback>
    )
  }
}