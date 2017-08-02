import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableHighlight } from 'react-native'
import Swipeout from 'react-native-swipeout'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import { getAvatar, formatDateTime } from '../helpers/reformatData'

const styles = StyleSheet.create({
  friendContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 5,
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

export default class FriendItem extends Component {
  constructor(props) {
    super(props)
    this.avatar = getAvatar(this.props.title)
    this.dateTime = formatDateTime(this.props.createAt)
  }
  onRowPress() {
    let item = {
      keyItemSelected: this.props.id,
      coordinateItemSelected: this.props.coordinate
    }
    this.props.onChangeItemSelected(item)
  }
  render() {
    const swipeoutBtns = [
      {
        component: <EditButton navigation={this.props.navigation}
          auth={this.props.auth}
          markerKey={this.props.id}
          coordinate={this.props.coordinate}
          oldTitle={this.props.title}
          oldDescription={this.props.description}
          dispatch={this.props.dispatch} />
      },
      {
        component: <DeleteButton auth={this.props.auth}
          markerKey={this.props.id}
          dispatch={this.props.dispatch} />
      }
    ]
    return (
      <Swipeout right={swipeoutBtns}>
        <TouchableNativeFeedback
          onPress={() => this.onRowPress()}
          background={TouchableNativeFeedback.Ripple('#adadad', false)}>
          <View style={styles.friendContainer}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarContent, { backgroundColor: this.avatar.color }]}>
                <Text style={styles.avatarLetter}>{this.avatar.letter}</Text>
              </View>
            </View>
            <View style={styles.informationContainer}>
              <Text style={styles.friendName} numberOfLines={1}>{this.props.title}</Text>
              <Text style={styles.friendAddress} numberOfLines={2}>{this.props.description}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateFormat}>{this.dateTime}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Swipeout>
    )
  }
}
FriendItem.propTypes = {
  id: PropTypes.string.isRequired,
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired,
  createAt: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChangeItemSelected: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}