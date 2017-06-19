import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'

const styles = StyleSheet.create({
  doneButtonContainter: {
    borderRadius: 5
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal',
    fontFamily: 'ProximaNovaSoft-Regular',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7
  }
})

export default class DoneButton extends Component {
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
      <View style={styles.doneButtonContainter}>
        <TouchableNativeFeedback
          onPress={() => this.onButtonPress()}
          background={TouchableNativeFeedback.Ripple('#adadad', true)}>
          <View style={styles.doneButton}>
            <Text style={styles.doneButtonText}>DONE</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}