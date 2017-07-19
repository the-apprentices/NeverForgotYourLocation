import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import BackButton from '../components/BackButton'
import DoneButton from '../components/DoneButton'
import MapView from '../components/MapView'
import SaveButton from '../components/SaveButton'
import WrapLocationInformation from '../components/WrapLocationInformation'
import { getAddress } from '../helpers/getData'
const styles = StyleSheet.create({
  doneWrap: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF'
  }
})

class SaveLocation extends Component {
  constructor(props) {
    super(props)
    this.setParams = null
    this.watchID = null
  }
  onChangePlaceName(placeName) {
    this.setParams({ placeName })
  }
  onChangePlaceAddress(placeAddress) {
    this.setParams({ placeAddress })
  }
  onChangeCoordinate = async (targetCoordinate) => {
    let placeAddress = await getAddress(targetCoordinate)
    this.setParams({ targetCoordinate, placeAddress })
  }
  onSaveButtonPress = (dispatch) => {
    this.setParams({
      isSavingMode: true,
      displayWrapperInfor: 'flex',
      displaySaveButton: 'none',
      dispatch: dispatch,
      auth: this.props.auth
    })
  }
  render() {
    const { state, setParams } = this.props.navigation
    this.setParams = setParams
    return (
      <View style={styles.mainContainer}>
        <MapView
          listMarkers={this.props.locations}
          isSavingMode={state.params.isSavingMode}
          targetCoordinate={state.params.targetCoordinate}
          onChangeCoordinate={this.onChangeCoordinate.bind(this)}
          zoomEnabled={true}
          scrollEnabled={true}
          showsMyLocationButton={true}
        />
        <WrapLocationInformation
          style={{ display: state.params.displayWrapperInfor }}
          placeName={state.params.placeName}
          onChangePlaceName={this.onChangePlaceName.bind(this)}
          placeAddress={state.params.placeAddress}
          onChangePlaceAddress={this.onChangePlaceAddress.bind(this)} />
        <SaveButton
          style={{ display: state.params.displaySaveButton }}
          onButtonPress={() => this.onSaveButtonPress(this.props.dispatch)} />
      </View>
    )
  }
}
SaveLocation.navigationOptions = ({ navigation }) => {
  const { state, setParams, goBack } = navigation
  const rightButton = (!state.params.isSavingMode) ? null :
    <DoneButton state={state} setParams={setParams} />
  return {
    title: 'SAVE LOCATION',
    headerLeft: <BackButton state={state} setParams={setParams} goBack={goBack} />,
    headerRight: <View style={styles.doneWrap}>{rightButton}</View>
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
  auth: state.auth.auth
})
export default connect(mapStateToProps)(SaveLocation)