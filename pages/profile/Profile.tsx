import React, { Component } from 'react'
import { View, Text, Switch, AsyncStorage, TouchableOpacity, Image } from 'react-native'
import { observer, inject } from 'mobx-react'

import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'

interface Props {
  store?: any
}
interface State {
  hasCameraPermission: boolean
  type: boolean
  isTakePic: boolean,
  picUri: string
}

@inject('store')
@observer
export default class Profile extends Component<Props, State> {
  camera = null
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isTakePic: false,
    picUri: 'http://placehold.it/240x180'
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ 
      hasCameraPermission: status === 'granted' 
    })
  }

  showTakePicScene() {
    this.setState({
      isTakePic: true
    })
  }

  async takePicture() {
    let result = await this.camera.takePictureAsync()
    this.setState({
      isTakePic: false,
      picUri: result.uri
    })
  }

  render() {
    return (
      <>
        {
          this.state.isTakePic
            ? (
              <Camera
                style={{ flex: 1 }} 
                type={this.state.type}
                ref={ref => {
                  this.camera = ref
                }}
              >
                <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                >
                  <View style={{marginLeft: 20, width: 80, height: 40, backgroundColor: '#f9efd4', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>拍照</Text>
                  </View>
                </TouchableOpacity>
              </Camera>
            )
            : (
              <View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20}}>
                  <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>是否显示地图：</Text>
                  </View>
                  <Switch
                    value={this.props.store.isShow}
                    onValueChange={(value) => {
                      this.props.store.setVisible(value)
                      AsyncStorage.setItem('isShow', value.toString())
                    }}
                  ></Switch>
                </View>
                <TouchableOpacity
                  onPress={this.showTakePicScene.bind(this)}
                >
                  <View style={{marginLeft: 20, width: 80, height: 40, backgroundColor: '#f9efd4', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>拍照</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Image style={{marginLeft: 20, marginTop: 20, width: 240, height: 180}} source={{uri: this.state.picUri}}></Image>
                </View>
              </View>

            )
        }
      </>
    )
  }
}
