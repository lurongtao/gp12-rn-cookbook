import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'mobx-react'

import store from './store/'

import Index from './pages/index/Index'
import HotList from './pages/list/List'

import {View, Text, StatusBar} from 'react-native'

function StackNavigator(Comp) {
  return (props) => {
    return (
      <Provider store={store} navigation={props.navigation}>
        <Comp></Comp>
      </Provider>
    )
  }
}

// function Home(props) {
//   return (
//     <Provider store={store} navigation={props.navigation}>
//       <Index></Index>
//     </Provider>
//   )
// }

// function List(props) {
//   return (
//     <Provider store={store} navigation={props.navigation}>
//       <HotList></HotList>
//     </Provider>
//   )
// }

const AppNavigator = createStackNavigator({
  Home: StackNavigator(Index),
  List: StackNavigator( HotList )
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
})

export default createAppContainer(AppNavigator)