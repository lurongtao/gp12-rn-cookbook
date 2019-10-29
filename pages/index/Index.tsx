import React, { Component } from 'react'
import TabNavigator from 'react-native-tab-navigator'
import { observer, inject } from 'mobx-react'

import * as Device from 'expo-device'

import {
  Image, View, Text, StatusBar, AsyncStorage
} from 'react-native'

import Home from '../home/Home'
import Map from '../map/Map'
import Profile from '../profile/Profile'

interface Props {
  navigation?: any,
  store?: any
}

interface State {
  selectedTab: string
}

import cookbook from '../../assets/images/cookbook.png'
import cookbookActive from '../../assets/images/cookbook-active.png'
import menu from '../../assets/images/menu.png'
import menuActive from '../../assets/images/menu-active.png'
import location from '../../assets/images/location.png'
import locationActive from '../../assets/images/location-active.png'
import more from '../../assets/images/more.png'
import moreActive from '../../assets/images/more-active.png'

import { Img } from './styledIndex.js'
import styles from './styleIndex.js'

@inject('store')
@observer
export default class Index extends Component<Props, State> {
  constructor(props) {
    super(props)
  }
  
  state: State = {
    selectedTab: 'profile'
  }

  async componentDidMount() {
    let isShow = await AsyncStorage.getItem('isShow')
    this.props.store.setVisible(JSON.parse(isShow))
  }

  render() {
    return (
      <View style={ styles.layout }>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <TabNavigator 
          style={Device.deviceName === 'iPhone Xʀ' ? styles.navigator : null}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="美食平台"
            selectedTitleStyle={{color: '#000'}}
            renderIcon={() => <Img source={cookbook} />}
            renderSelectedIcon={() => <Img source={cookbookActive} />}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'category'}
            title="热门分类"
            selectedTitleStyle={{color: '#000'}}
            renderIcon={() => <Img source={menu} />}
            renderSelectedIcon={() => <Img source={menuActive} />}
            onPress={() => this.setState({ selectedTab: 'category' })}>
            {<View><Text>aa</Text></View>}
          </TabNavigator.Item>
          {
            this.props.store.isShow
              ? (
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'map'}
                  title="地图"
                  selectedTitleStyle={{color: '#000'}}
                  renderIcon={() => <Img source={location} />}
                  renderSelectedIcon={() => <Img source={locationActive} />}
                  onPress={() => this.setState({ selectedTab: 'map' })}>
                  <Map></Map>
                </TabNavigator.Item>
              )
              : null
          }
          
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="更多"
            selectedTitleStyle={{color: '#000'}}
            renderIcon={() => <Img source={more} />}
            renderSelectedIcon={() => <Img source={moreActive} />}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <Profile></Profile>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}