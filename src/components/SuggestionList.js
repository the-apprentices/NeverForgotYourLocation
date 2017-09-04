import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, ListView, TouchableNativeFeedback } from 'react-native'
import CardView from 'react-native-cardview'
const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  suggestionListWrapper: {
    backgroundColor: '#ffffff',
    margin: 8,
    marginTop: 0,
    borderRadius: 2,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8
  },
  suggestionItemContent: {
    flex: 0.85,
  },
  borderContainer: {
    flexDirection: 'row'
  },
  borderWhite: {
    flex: 0.15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF'
  },
  borderView: {
    flex: 0.85,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#C1C3C1'
  },
  placeContent: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'ProximaNovaSoft-Regular'
  }
})
const renderRow = (data, onChangeText) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        onChangeText(data)
      }}
      background={TouchableNativeFeedback.Ripple('#adadad', false)}>
      <View style={styles.suggestionItem}>
        <View style={styles.iconContainer}></View>
        <View style={styles.suggestionItemContent}>
          <Text style={styles.placeContent}>{data}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}
const renderSeparator = () => {
  return (
    <View style={styles.borderContainer}>
      <View style={styles.borderWhite}></View>
      <View style={styles.borderView}></View>
    </View>
  )
}
export default class SuggestionList extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }
  render() {
    return (
      <CardView style={styles.suggestionListWrapper}
        cardElevation={3}
        cardMaxElevation={0}
        cornerRadius={2}>
        <ListView style={styles.suggestionList}
          dataSource={this.ds.cloneWithRows(this.props.suggestionList)}
          renderRow={(data) => renderRow(data, this.props.onChangeText)}
          renderSeparator={() => renderSeparator()} />
      </CardView>
    )
  }
}
SuggestionList.propTypes = {
  suggestionList: PropTypes.array.isRequired,
  onChangeText: PropTypes.func.isRequired
}