import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  ListView
} from 'react-native'
import FriendItem from './FriendItem'

export default class FriendsListView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
  }
  static propTypes = {
    friendsList: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }).isRequired,
      createAt: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onListViewElementSelected: PropTypes.func.isRequired
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView style={styles.friendsList}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(this.props.friendsList)}
          renderRow={(data) =>
            <FriendItem
              {...data}
              id={data.key}
              onListViewElementSelected={this.props.onListViewElementSelected}
            />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  friendsList: {
    position: 'absolute',
    top: 0,
    bottom: 75,
    left: 0,
    right: 0,
    flex: 0.5
  }
})