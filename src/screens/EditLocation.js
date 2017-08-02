import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native'
import MapView from '../components/MapView'
import WrapLocationInformation from '../components/WrapLocationInformation'
import DoneButton from '../components/DoneEditButton'
const DEFAULT_LATITUDE_DELTA = 0.005
const DEFAULT_LONGITUDE_DELTA = 0.001
const styles = StyleSheet.create({
  doneWrap: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1
  },
  editInforContainer: {
    ...StyleSheet.absoluteFillObject
  }
})
export default class EditLocation extends Component {
  constructor(props) {
    super(props)
    this.locationData = null
    this.setParams = null
    this.state = {
      locationData: [],
      title: '',
      description: ''
    }
  }
  onChangeTitle(title) {
    this.setParams({ title, locationData: [{ ...this.locationData, title }] })
  }
  onChangeDescription(description) {
    this.setParams({ description, locationData: [{ ...this.locationData, description }] })
  }
  componentDidMount() {
    this.setParams({
      title: this.locationData.oldTitle,
      description: this.locationData.oldDescription
    })
  }
  render() {
    const { state, setParams } = this.props.navigation
    this.locationData = state.params
    this.setParams = setParams
    return (
      <View style={styles.mainContainer}>
        <MapView
          listMarkers={[state.params]}
          initialRegion={{
            ...state.params.coordinate,
            latitudeDelta: DEFAULT_LATITUDE_DELTA,
            longitudeDelta: DEFAULT_LONGITUDE_DELTA
          }}
          zoomEnabled={false}
          scrollEnabled={false}
          showsMyLocationButton={false} />
        <View style={styles.editInforContainer}>
          <WrapLocationInformation
            placeName={state.params.title}
            onChangePlaceName={this.onChangeTitle.bind(this)}
            placeAddress={state.params.description}
            onChangePlaceAddress={this.onChangeDescription.bind(this)} />
        </View>
      </View>
    )
  }
}
EditLocation.navigationOptions = ({ navigation }) => {
  const { state, goBack } = navigation
  const { oldTitle, userId, key, title, description, dispatch } = state.params
  return {
    title: oldTitle,
    headerRight: <View style={styles.doneWrap}>
      <DoneButton userId={userId}
        markerKey={key}
        title={title}
        description={description}
        dispatch={dispatch}
        navigation={navigation} />
    </View>
  }
}
EditLocation.propTypes = {
  navigation: PropTypes.object.isRequired
}