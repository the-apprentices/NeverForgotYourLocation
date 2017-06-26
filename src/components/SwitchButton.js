import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import BaseSwitchButton from './BaseSwitchButton'

export default class SwitchButton extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    leftButtonBackgroundColor: PropTypes.string.isRequired,
    rightButtonBackgroundColor: PropTypes.string.isRequired,
    leftButtonTextColor: PropTypes.string.isRequired,
    rightButtonTextColor: PropTypes.string.isRequired,
    onSwitchButtonPress: PropTypes.func.isRequired
  }
  onSwitchToLeft() {
    this.props.onSwitchButtonPress(true)
  }
  onSwitchToRight() {
    this.props.onSwitchButtonPress(false)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <BaseSwitchButton buttonText='FRIENDS'
          backgroundColor={this.props.leftButtonBackgroundColor}
          textColor={this.props.leftButtonTextColor}
          onSwitchState={this.onSwitchToLeft.bind(this)}
        />
        <BaseSwitchButton buttonText='LOCATIONS'
          backgroundColor={this.props.rightButtonBackgroundColor}
          textColor={this.props.rightButtonTextColor}
          onSwitchState={this.onSwitchToRight.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: 60,
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7D8DA',
    borderColor: '#FD482E',
    borderWidth: 1,
    borderRadius: 30
  }
})