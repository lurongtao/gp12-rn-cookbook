import React, { Component } from 'react'

import {
  ScrollView,
} from 'react-native'


import Swiper from './Swiper'
import HotCate from './HotCate'
import Top10 from './Top10'

interface Props {
}

interface State {
}

class Home extends Component<Props, State> {
  render() {    
    return (
      <ScrollView>
        <Swiper></Swiper>
        <HotCate></HotCate>
        <Top10></Top10>
      </ScrollView>
    )
  }
}

export default Home