import React, { Component } from 'react'
import { Carousel } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react'
import {
  View,
  Image,
} from 'react-native'

import { get } from '../../utils/http'

import styles from './styleHome.js'

interface Props {
  store?: any
}

interface State {
  
}

@inject('store')
@observer
export default class Swiper extends Component<Props, State> {
  state = {}

  async componentDidMount() {
    let list = await get('http://192.168.43.82:9000/api/list')
    this.props.store.setList(list)
  }

  render() {
    return (
      <Carousel
        style={styles.wrapper}
        selectedIndex={0}
        autoplay
        infinite
      >
        {
          this.props.store.list.slice(0, 5).map((value) => {
            return (
              <View
                style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
                key={value.id}
              >
                <Image source={{uri: value.img}} style={styles.slideImg}></Image>
              </View>
            )
          })
        }
      </Carousel>
    )
  }
}
