import React, { Component, createRef } from 'react'
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
  datalist: Array<object>,
  refresh: boolean
}

@inject('store')
@observer
export default class List extends Component<Props, State> {
  flatlist: any
  constructor (props) {
    super(props)
    this.flatlist = createRef()
  }
  state = {
    curPage: 1,
    datalist: [],
    refresh: false
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

  handleReachEnd() {
    // if (this.state.curPage > 1) {
      this.setState((state) => {
        return {
          curPage: state.curPage + 1
        }
      }, () => {
        this.loadData()
      })
    // }
  }

  handleRefresh() {
    this.setState({
      refresh: true
    })

    setTimeout(() => {
      this.setState({
        refresh: false
      })
    }, 2000)
  }

  render() {
    return (
      <FlatList
        ref={this.flatlist}
        renderItem={this._renderItem.bind(this)}
        data={this.state.datalist}
        refreshing={this.state.refresh}
        onEndReached={this.handleReachEnd.bind(this)}
        onEndReachedThreshold={1}
        onRefresh={this.handleRefresh.bind(this)}
      ></FlatList>
    )
  }

  loadData() {
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

  componentDidMount() {
    setTimeout((params) => {
      this.loadData()
    }, 0)

    // this.flatlist.current.recordInteraction()
  }
}



// import React, {Component} from "react";
// import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";

// const REQUEST_URL = 'https://api.github.com/search/repositories?q=javascript&sort=stars&page=';
// let pageNo = 1;//当前第几页
// let totalPage=5;//总的页数
// let itemNo=0;//item的个数

// export default class LoadMoreDemo extends Component<Props, State> {
//     state = {
//       isLoading: true,
//       //网络请求状态
//       error: false,
//       errorInfo: "",
//       dataArray: [],
//       showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
//       isRefreshing:false,//下拉控制
//     }

//     //网络请求——获取第pageNo页数据
//     fetchData(pageNo) {
//         //这个是js的访问网络的方法
//         fetch(REQUEST_URL+pageNo)
//             .then((response) => response.json())
//             .then((responseData) => {
//                 let data = responseData.items;
//                 let dataBlob = [];
//                 let i = itemNo;

//                 data.map(function (item) {
//                     dataBlob.push({
//                         key: i + 'a',
//                         value: item,
//                     })
//                     i++;
//                 });
//                 itemNo = i;
//                 console.log("itemNo:"+itemNo);
//                 let foot = 0;
//                 if(pageNo>=totalPage){
//                     foot = 1;//listView底部显示没有更多数据了
//                 }

//                 this.setState({
//                     //复制数据源
//                     dataArray:this.state.dataArray.concat(dataBlob),
//                     isLoading: false,
//                     showFoot:foot,
//                     isRefreshing:false,
//                 });
//                 data = null;
//                 dataBlob = null;
//             })
//             .catch((error) => {
//                 this.setState({
//                     error: true,
//                     errorInfo: error
//                 })
//             })
//     }

//     componentDidMount() {
//         //请求数据
//         this.fetchData( pageNo );
//     }

//     //加载等待页
//     renderLoadingView() {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator
//                     animating={true}
//                     color='red'
//                     size="large"
//                 />
//             </View>
//         );
//     }

//     //加载失败view
//     renderErrorView() {
//         return (
//             <View style={styles.container}>
//                 <Text>
//                     Fail
//                 </Text>
//             </View>
//         );
//     }

//     //返回itemView
//     _renderItemView({item}) {
//         return (
//             <View>
//                 <Text style={styles.title}>name: {item.value.name}</Text>
//                 <Text style={styles.content}>stars: {item.value.stargazers_count}</Text>
//                 <Text style={styles.content}>description: {item.value.description}</Text>
//             </View>
//         );
//     }

//     renderData() {
//         return (

//             <FlatList
//                 data={this.state.dataArray}
//                 renderItem={this._renderItemView}
//                 // ListFooterComponent={this._renderFooter.bind(this)}
//                 onEndReached={this._onEndReached.bind(this)}
//                 onEndReachedThreshold={1}

//             />

//         );
//     }

//     render() {
//         //第一次加载等待的view
//         if (this.state.isLoading && !this.state.error) {
//             return this.renderLoadingView();
//         } else if (this.state.error) {
//             //请求失败view
//             return this.renderErrorView();
//         }
//         //加载数据
//         return this.renderData();
//     }
//     _separator(){
//         return <View style={{height:1,backgroundColor:'#999999'}}/>;
//     }
//     _renderFooter(){
//         if (this.state.showFoot === 1) {
//             return (
//                 <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
//                     <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
//                         没有更多数据了
//                     </Text>
//                 </View>
//             );
//         } else if(this.state.showFoot === 2) {
//             return (
//                 <View style={styles.footer}>
//                     <ActivityIndicator />
//                     <Text>正在加载更多数据...</Text>
//                 </View>
//             );
//         } else if(this.state.showFoot === 0){
//             return (
//                 <View style={styles.footer}>
//                     <Text></Text>
//                 </View>
//             );
//         }
//     }

//     _onEndReached(){
//         console.log(0)
//         //如果是正在加载中或没有更多数据了，则返回
//         if(this.state.showFoot != 0 ){
//             return ;
//         }
//         //如果当前页大于或等于总页数，那就是到最后一页了，返回
//         if((pageNo!=1) && (pageNo>=totalPage)){
//             return;
//         } else {
//             pageNo++;
//         }
//         //底部显示正在加载更多数据
//         this.setState({showFoot:2});
//         //获取数据
//         // this.fetchData( pageNo );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     title: {
//         fontSize: 15,
//         color: 'blue',
//     },
//     footer:{
//         flexDirection:'row',
//         height:24,
//         justifyContent:'center',
//         alignItems:'center',
//         marginBottom:10,
//     },
//     content: {
//         fontSize: 15,
//         color: 'black',
//     }
// });