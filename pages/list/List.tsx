import React, { Component } from 'react'
import {
  inject,
  observer
} from 'mobx-react'
import {
  View,
  Text,
  Image,
  FlatList
} from 'react-native'
import styles from './styleList'

interface Props {
  store?: any
}
interface State {
  curPage: number,
  datalist: Array<object>
}

@inject('store')
@observer
export default class List extends Component<Props, State> {
  state = {
    curPage: 1,
    datalist: []
  }

  static navigationOptions = {
    title: '美食列表',
  }

  _renderItem(item, index) {
    let {img, name, burdens, all_click, favorites} = item.item.data   
    return (
      <View style={styles.listWrap}>
        <View style={styles.imgWrap}>
          <Image style={styles.image} source={{uri: 'http://placehold.it/115x75'}}></Image>
        </View>
        <View style={styles.descWrap}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{burdens}</Text>
          <Text style={styles.desc}>{all_click} {favorites}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        renderItem={this._renderItem.bind(this)}
        data={this.state.datalist}
      ></FlatList>
    )
  }

  componentDidMount() {
    let data = this.props.store.list.slice(0, this.state.curPage * 10)    
    let flatListData = data.map((value, index) => ({
        data: value,
        key: value.id
      })
    )
    this.setState({
      datalist: flatListData
    })
  }
}
