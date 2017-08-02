import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import ViewLocations from '../components/ViewLocations'
import SwitchButton from '../components/SwitchButton'
import Header from '../headers/VisitedLocations'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  switchButtonContainer: {
    position: 'absolute',
    top: 0,
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

class VisitedLocations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPageView: 0
    }
  }
  onChangeCurrentPage(currentPageView) {
    this.setState({ currentPageView })
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ViewLocations currentPage={this.state.currentPageView}
          locations={this.props.locations}
          onChangeCurrentPage={this.onChangeCurrentPage.bind(this)}
          auth={this.props.auth}
          dispatch={this.props.dispatch}
          navigation={this.props.navigation} />
        <View style={styles.switchButtonContainer}>
          <SwitchButton
            currentPage={this.state.currentPageView}
            onChangeCurrentPage={this.onChangeCurrentPage.bind(this)} />
        </View>
      </View>
    )
  }
}
VisitedLocations.navigationOptions = Header
VisitedLocations.propTypes = {
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
export default connect(mapStateToProps)(VisitedLocations)