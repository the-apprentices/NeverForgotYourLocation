import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'
import BaseSwitchButton from './BaseSwitchButton'
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

export default class SwitchButton extends Component {
  constructor(props) {
    super(props)
    this.mapPage = 0
    this.listPage = 1
    this.state = {
      leftButtonBackgroundColor: '#D7D8DA',
      rightButtonBackgroundColor: '#FD482E',
      leftButtonTextColor: '#FD482E',
      rightButtonTextColor: '#ffffff'
    }
  }
  onSwitchToLeft() {
    this.setState({
      leftButtonBackgroundColor: '#FD482E',
      rightButtonBackgroundColor: '#D7D8DA',
      leftButtonTextColor: '#ffffff',
      rightButtonTextColor: '#FD482E'
    })
    this.props.onChangeCurrentPage(this.listPage)
  }
  onSwitchToRight() {
    this.setState({
      leftButtonBackgroundColor: '#D7D8DA',
      rightButtonBackgroundColor: '#FD482E',
      leftButtonTextColor: '#FD482E',
      rightButtonTextColor: '#ffffff'
    })
    this.props.onChangeCurrentPage(this.mapPage)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      if (nextProps.currentPage === this.listPage)
        this.setState({
          leftButtonBackgroundColor: '#FD482E',
          rightButtonBackgroundColor: '#D7D8DA',
          leftButtonTextColor: '#ffffff',
          rightButtonTextColor: '#FD482E'
        })
      else
        this.setState({
          leftButtonBackgroundColor: '#D7D8DA',
          rightButtonBackgroundColor: '#FD482E',
          leftButtonTextColor: '#FD482E',
          rightButtonTextColor: '#ffffff'
        })
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <BaseSwitchButton buttonText='LOCATIONS'
          backgroundColor={this.state.rightButtonBackgroundColor}
          textColor={this.state.rightButtonTextColor}
          onButtonPress={this.onSwitchToRight.bind(this)}
        />
        <BaseSwitchButton buttonText='FRIENDS'
          backgroundColor={this.state.leftButtonBackgroundColor}
          textColor={this.state.leftButtonTextColor}
          onButtonPress={this.onSwitchToLeft.bind(this)}
        />
      </View>
    )
  }
}
SwitchButton.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onChangeCurrentPage: PropTypes.func.isRequired
}