import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'mobx-react'

import store from './store/'

import Index from './pages/index/Index'

import {View, Text} from 'react-native'

function App() {
  return (
    <Provider store={store}>
      <Index></Index>
    </Provider>
  )
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
}, {
  initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator)
