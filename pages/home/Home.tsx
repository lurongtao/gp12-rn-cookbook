import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native'

import { Carousel, Grid } from '@ant-design/react-native'

import { get } from '../../utils/http'

interface Props {
  store?: any
}
interface State {
  hotCate?: Array<object>,
  top10?: Array<object>
}

import styles from './styleHome.js'

@inject('store')
@observer
class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  state = {
    hotCate: [],
    top10: []
  }

  renderCarousel(el, index) {
    return (
      <View style={styles.container}>
        {el.icon ? <Image style={styles.gridImg} source={{uri: el.icon}}></Image> : null}
        <Text style={styles.gridText}>{el.text}</Text>
      </View>
    )
  }

  renderTop10(el, index) {
    return (
      <View style={styles.top10Container}>
        <Image style={styles.gridTop10Img} source={{uri: el.icon}}></Image>
        <View>
          <Text style={styles.gridTop10Title}>{el.text}</Text>
          <Text style={styles.gridTop10Desc}>{el.text}</Text>
        </View>
      </View>
    )
  }

  handlePress() {

  }

  render() {    
    return (
      <ScrollView>
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
        <Grid
          data={this.state.hotCate}
          columnNum={3}
          hasLine={false}
          renderItem={this.renderCarousel}
          onPress={this.handlePress.bind(this)}
        />
        <Grid
          data={this.state.hotCate}
          columnNum={2}
          hasLine={false}
          renderItem={this.renderTop10}
          onPress={this.handlePress.bind(this)}
        />
      </ScrollView>
    )
  }

  async componentDidMount() {
    let list = await get('http://dev.gp12.cn:9000/api/list')
    this.props.store.setList(list)

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

    let mapedTop10 = this.props.store.list.slice(0, 10).map((value, index) => {
      return {
        img: value.img,
        all_click: value.all_click,
        favorites: value.favorites
      }
    })

    this.setState({
      hotCate: mapedHotCate,
      top10: mapedTop10
    })
  }
}

export default Home