import React, { Component, PropTypes } from 'react'
import ViewPlacesButton from '../components/ViewPlacesButton'

export default class ViewPlaces extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    onButtonPress: PropTypes.func.isRequired
  }

  onViewButtonPress() {
    this.props.onButtonPress()
  }

  render() {
    return (
      <ViewPlacesButton
        onButtonPress={() => this.onViewButtonPress()} />
    )
  }
}