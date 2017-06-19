import React, { Component, PropTypes } from 'react'
import EnableSaveModeButton from '../components/EnableSaveModeButton'

export default class EnableSaveLocation extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    buttonWrapperStyle: PropTypes.object.isRequired,
    onButtonPress: PropTypes.func.isRequired
  }

  onSaveButtonPress(navigate) {
    this.props.onButtonPress()
  }

  render() {
    return (
      <EnableSaveModeButton
        buttonWrapperStyle={this.props.buttonWrapperStyle}
        onButtonPress={() => this.onSaveButtonPress()}
      />
    )
  }
}