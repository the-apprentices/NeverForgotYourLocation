import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'
import EditorInformation from './../components/EditorInformation'
import SuggestionList from './../components/SuggestionList'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F3F3'
  },
  suggestionListContainer: {
    flex: 1
  }
})
export default class SuggestionScreen extends Component {
  constructor(props) {
    super(props)
    this.onParentChangeText = null
    this.initTextValue = ''
    this.state = {
      textValue: ''
    }
  }
  onChangeText(textValue) {
    this.setState({ textValue })
    this.onParentChangeText(textValue)
  }
  componentDidMount() {
    this.setState({ textValue: this.initTextValue })
  }
  render() {
    const { goBack, state } = this.props.navigation
    this.initTextValue = state.params.textValue
    this.onParentChangeText = state.params.onChangeText
    const { placeHolder, suggestionList } = state.params
    return (
      <View style={styles.mainContainer} >
        <EditorInformation goBack={goBack}
          placeHolder={placeHolder}
          onChangeText={this.onChangeText.bind(this)}
          textValue={this.state.textValue} />
        <View style={styles.suggestionListContainer}>
          <SuggestionList suggestionList={suggestionList}
            onChangeText={this.onChangeText.bind(this)} />
        </View>
      </View>
    )
  }
}
SuggestionScreen.navigationOptions = {
  header: null
}
SuggestionScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}