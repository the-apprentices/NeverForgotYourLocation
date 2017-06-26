import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
import Helpers from '../helpers/handleData'

export default class FriendItem extends Component {
  constructor(props) {
    super(props)
    this.avatarFormat = Helpers.getAvatar(this.props.title)
    this.dateFormat = Helpers.formatDateTime(this.props.createAt)
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired,
    createAt: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onListViewElementSelected: PropTypes.func.isRequired
  }
  onRowPress() {
    setTimeout(() => this.props.onListViewElementSelected(this.props.coordinate, this.props.id), 10)
  }
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => this.onRowPress()}
        background={TouchableNativeFeedback.Ripple('#adadad', false)}>
        <View style={styles.friendContainer}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarContent, { backgroundColor: this.avatarFormat.color }]}>
              <Text style={styles.avatarLetter}>{this.avatarFormat.letter}</Text>
            </View>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.friendName} numberOfLines={1}>{this.props.title}</Text>
            <Text style={styles.friendAddress} numberOfLines={2}>{this.props.description}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateFormat}>{this.dateFormat}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
const styles = StyleSheet.create({
  friendContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 5,
    marginTop: 1.5,
    marginBottom: 1.5,
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