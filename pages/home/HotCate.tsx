import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import {
  View,
  Text,
  Image
} from 'react-native'

import { Carousel, Grid } from '@ant-design/react-native'

import styles from './styleHome.js'

import { get } from '../../utils/http'

interface Props {
  
}
interface State {
  hotCate?: Array<object>
}

export default class HotCate extends Component<Props, State> {
  state = {
    hotCate: []
  }

  handlePress() {

  }

  async componentDidMount() {
    let hotCate = await get('http://dev.gp12.cn:9000/api/hot_category')

    hotCate.push({
      img: '',
      title: '更多...'
    })

    let mapedHotCate = hotCate.map((value) => {
      return {
        icon: value.img,
        text: value.title
      }
    })

    this.setState({
      hotCate: mapedHotCate
    })
  }

  renderCarousel(el, index) {
    return (
      <View style={styles.container}>
        {el.icon ? <Image style={styles.gridImg} source={{uri: el.icon}}></Image> : null}
        <Text style={styles.gridText}>{el.text}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{marginTop: 15}}>
        <Grid
          data={this.state.hotCate}
          columnNum={3}
          hasLine={false}
          renderItem={this.renderCarousel}
          onPress={this.handlePress.bind(this)}
        />
      </View>
    )
  }
}
