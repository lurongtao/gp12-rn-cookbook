import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'mobx-react'

import store from './store/'

import Index from './pages/index/Index'

import {View, Text, StatusBar} from 'react-native'

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
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    title: '美食大全',
    headerStyle: {
      backgroundColor: '#ee7530',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

export default createAppContainer(AppNavigator)

// export default App