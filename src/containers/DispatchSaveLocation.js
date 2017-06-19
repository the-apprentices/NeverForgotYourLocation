import React, { Component, PropTypes } from 'react'
import SaveButton from '../components/SaveButton'

export default class DispatchSaveLocation extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    buttonWrapperStyle: PropTypes.number.isRequired,
    onButtonPress: PropTypes.func.isRequired
  }

  onSaveButtonPress() {
    this.props.onButtonPress()
  }

  render() {
    return (
      <SaveButton
        buttonWrapperStyle={this.props.buttonWrapperStyle}
        onButtonPress={() => this.onSaveButtonPress()} />
    )
  }
}