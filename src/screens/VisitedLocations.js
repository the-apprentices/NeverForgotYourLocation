import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native'
import ViewLocations from '../components/ViewLocations'
import SwitchButton from '../components/SwitchButton'
const icons = {
  search: require('../assets/imgs/search.png')
}
const styles = StyleSheet.create({
  searchWrap: {
    flex: 1,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconSize: {
    width: 25,
    height: 25
  },
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
          onChangeCurrentPage={this.onChangeCurrentPage.bind(this)} />
        <View style={styles.switchButtonContainer}>
          <SwitchButton
            currentPage={this.state.currentPageView}
            onChangeCurrentPage={this.onChangeCurrentPage.bind(this)} />
        </View>
      </View>
    )
  }
}
VisitedLocations.navigationOptions = ({ navigation }) => {
  return {
    title: 'VISITED LOCATIONS',
    headerRight: <View style={styles.searchWrap}>
      <TouchableNativeFeedback
        onPress={() => { }}
        background={TouchableNativeFeedback.Ripple('#adadad', true)}>
        <View style={styles.searchButton}>
          <Image style={styles.iconSize} source={icons.search} />
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}
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