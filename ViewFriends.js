import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native'

export default class ViewFriends extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        {/*<ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Friend {...data} />}
        />*/}
        <Text>View Friends</Text>
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
      <View style={styles.friendContainer} elevation={5}>
        {/*<View style={styles.avatarContainer}>

        </View>
        <View style={styles.informationContainer}>

        </View>
        <View style={styles.dateContainer}>

        </View>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  friendContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'green',
    // elevation   : 50
  },
  avatarContainer: {
    flex: 0.2,
    backgroundColor: 'black'
  },
  informationContainer: {
    flex: 0.5,
    backgroundColor: 'blue'
  },
  dateContainer: {
    flex: 0.3,
    backgroundColor: 'green'
  }
})
