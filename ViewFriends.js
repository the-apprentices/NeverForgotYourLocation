import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'
import Spinner from 'react-native-spinkit'

export default class ViewFriends extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
  }
  static propTypes = {
    listFriendData: PropTypes.array.isRequired,
    onListViewElementSelected: PropTypes.func.isRequired
  }
  render() {
    if (this.props.listFriendData.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <Spinner size={75} color={'#358ff4'} type={'ChasingDots'} />
        </View>
      )
    } else {
      return (
        <View style={styles.mainContainer}>
          <ListView style={styles.listFriends}
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.listFriendData)}
            renderRow={(data) =>
              <Friend
                {...data}
                onListViewElementSelected={this.props.onListViewElementSelected}
              />}
          />
        </View>
      )
    }
  }
}

class Friend extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    coordinate: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    createAt: PropTypes.string.isRequired,
    avatar: PropTypes.object.isRequired,
    onListViewElementSelected: PropTypes.func.isRequired
  }
  onRowPress() {
    this.props.onListViewElementSelected(this.props.coordinate)
  }
  render() {
    return (
      <TouchableHighlight underlayColor={'#00f9ff'}
        onPress={() => this.onRowPress()}>
        <View style={styles.friendContainer}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarContent, { backgroundColor: this.props.avatar.color }]}>
              <Text style={styles.avatarLetter}>{this.props.avatar.letter}</Text>
            </View>
          </View>
          <View style={styles.informationContainer}>
            <View>
              <Text style={styles.friendName} numberOfLines={1}>{this.props.title}</Text>
            </View>
            <View>
              <Text style={styles.friendAddress} numberOfLines={2}>{this.props.subtitle}</Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateFormat}>{this.props.createAt}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  listFriends: {
    position: 'absolute',
    top: 0,
    bottom: 75,
    left: 0,
    right: 0,
    flex: 0.5
  },
  friendContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 5,
    marginTop: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D7D8DA'
  },
  avatarContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarLetter: {
    color: '#000000',
    fontSize: 36,
    fontFamily: 'ProximaNovaSoft-Regular'
  },
  informationContainer: {
    flex: 0.5,
    padding: 5
  },
  friendName: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'ProximaNovaSoft-Regular'
  },
  friendAddress: {
    color: '#7f7f7f',
    fontSize: 16,
    fontFamily: 'ProximaNovaSoft-Regular'
  },
  dateContainer: {
    flex: 0.3,
    padding: 6
  },
  dateFormat: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})