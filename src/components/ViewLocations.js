import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ViewPagerAndroid } from 'react-native'
import FriendsListView from '../components/FriendsListView'
import MapView from '../components/MapView'
const styles = StyleSheet.create({
  viewPagerContainer: {
    flex: 1
  }
})

export default class ViewLocations extends Component {
  constructor(props) {
    super(props)
    this.mapPage = 1
    this.state = {
      keyItemSelected: '',
      coordinateItemSelected: null
    }
  }
  onPageSelected = (e) => {
    this.props.onChangeCurrentPage(e.nativeEvent.position)
  }
  onChangeItemSelected({ keyItemSelected, coordinateItemSelected }) {
    this.setState({ keyItemSelected, coordinateItemSelected })
    this.viewPager.setPage(this.mapPage)
    this.props.onChangeCurrentPage(this.mapPage)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage)
      this.viewPager.setPage(nextProps.currentPage)
  }
  render() {
    return (
      <ViewPagerAndroid style={styles.viewPagerContainer}
        ref={(viewPager) => { this.viewPager = viewPager }}
        initialPage={this.props.currentPage}
        onPageSelected={this.onPageSelected}
        scrollEnabled={false}>
        <View>
          <FriendsListView friendsList={this.props.locations}
            onChangeItemSelected={this.onChangeItemSelected.bind(this)}
            auth={this.props.auth}
            dispatch={this.props.dispatch}
            navigation={this.props.navigation} />
        </View>
        <View>
          <MapView listMarkers={this.props.locations}
            keyItemSelected={this.state.keyItemSelected}
            newRegion={this.state.coordinateItemSelected}
            zoomEnabled={true}
            scrollEnabled={true}
            showsMyLocationButton={true} />
        </View>
      </ViewPagerAndroid>
    )
  }
}
ViewLocations.propTypes = {
  currentPage: PropTypes.number.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onChangeCurrentPage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}