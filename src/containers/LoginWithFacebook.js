import React, { Component, PropTypes } from 'react'
import FacebookLoginButton from '../components/FacebookLoginButton'

export default class LoginWithFacebook extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    buttonWrapperStyle: PropTypes.number.isRequired,
    buttonText: PropTypes.string.isRequired,
    onButtonPress: PropTypes.func.isRequired
  }

  onButtonPress() {
    this.props.onButtonPress()
  }

  render() {
    return (
      <FacebookLoginButton
        buttonWrapperStyle={this.props.buttonWrapperStyle}
        buttonText={this.props.buttonText}
        onButtonPress={() => this.onButtonPress()} />
    )
  }
}