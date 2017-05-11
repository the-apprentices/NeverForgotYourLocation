import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image
} from 'react-native'

export default class ViewFriends extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
  }
  static propTypes = {
    listFriendData: PropTypes.array.isRequired
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView style={styles.listFriends}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(this.props.listFriendData)}
          renderRow={(data) => <Friend {...data} />}
        />
      </View>
    )
  }
}

class Friend extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.friendContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrap}>
            <Image style={styles.avatarContent} source={require('./src/assets/imgs/avatar.png')} />
          </View>
        </View>
        <View style={styles.informationContainer}>
          <View>
            <Text style={styles.friendName}>{this.props.title}</Text>
          </View>
          <View>
            <Text style={styles.friendAddress}>{this.props.subtitle}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    flex: 0.2
  },
  avatarWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarContent: {
    width: 60,
    height: 60,
    borderRadius: 30
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
  }
})