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
  hotCate?: Array<object>
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  slideImg: {
    height: 170,
    width: '100%'
  }
});

@inject('store')
@observer
class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  state = {
    hotCate: []
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
          isCarousel
          onPress={(_el, index) => alert(index)}
        />
      </ScrollView>
    )
  }

  async componentDidMount() {
    let list = await get('http://dev.gp12.cn:9000/api/list')
    this.props.store.setList(list)

    let hotCate = await get('http://dev.gp12.cn:9000/api/hot_category')
    this.setState({
      hotCate
    })
  }
}

export default Home