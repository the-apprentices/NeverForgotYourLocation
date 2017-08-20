import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import BackButton from '../components/BackButton'
import DoneButton from '../components/DoneButton'
import MapView from '../components/MapView'
import SaveButton from '../components/SaveButton'
import WrapLocationInformation from '../components/WrapLocationInformation'
import { onChangeMode, onChangeCoordinate, onChangePlaceName, onChangePlaceAddress } from '../actions/saveScreen'
import { getAddress } from '../helpers/getData'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  }
})

class SaveLocation extends Component {
  constructor(props) {
    super(props)
    this.watchID = null
    this.dispatch = null
  }
  onChangePlaceName(placeName) {
    this.dispatch(onChangePlaceName(placeName))
  }
  onChangePlaceAddress(placeAddress) {
    this.dispatch(onChangePlaceAddress(placeAddress))
  }
  onChangeCoordinate = async (targetCoordinate) => {
    let placeAddress = await getAddress(targetCoordinate)
    this.dispatch(onChangeCoordinate(targetCoordinate, '', placeAddress))
  }
  onSaveButtonPress = () => {
    this.dispatch(onChangeMode(true, this.dispatch))
  }
  render() {
    const uiState = this.props.uiState
    this.dispatch = this.props.dispatch
    return (
      <View style={styles.mainContainer}>
        <MapView
          listMarkers={this.props.locations}
          isSavingMode={uiState.isSavingMode}
          targetCoordinate={uiState.coordinate}
          onChangeCoordinate={this.onChangeCoordinate.bind(this)}
          zoomEnabled={true}
          scrollEnabled={true}
          showsMyLocationButton={true}
        />
        <WrapLocationInformation
          style={{ display: uiState.isSavingMode ? 'flex' : 'none' }}
          placeName={uiState.placeName}
          onChangePlaceName={this.onChangePlaceName.bind(this)}
          placeAddress={uiState.placeAddress}
          onChangePlaceAddress={this.onChangePlaceAddress.bind(this)} />
        <SaveButton
          style={{ display: uiState.isSavingMode ? 'none' : 'flex' }}
          onButtonPress={() => this.onSaveButtonPress()} />
      </View>
    )
  }
}
SaveLocation.navigationOptions = ({ navigation }) => {
  const { goBack } = navigation
  return {
    title: 'SAVE LOCATION',
    headerLeft: <BackButton goBack={goBack} />,
    headerRight: <DoneButton />
  }
}
SaveLocation.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired).isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  locations: state.locations.locations,
  auth: state.auth.auth,
  uiState: state.saveScreen
})
export default connect(mapStateToProps)(SaveLocation)