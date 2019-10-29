import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

interface Props {
  
}
interface State {
  
}

export default class Map extends Component<Props, State> {
  state = {}

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView 
          style={{flex: 1}}
          source={{ uri: 'https://map.baidu.com' }}
        ></WebView>
      </View>
    )
  }
}