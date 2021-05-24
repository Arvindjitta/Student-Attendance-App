import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';
import { Header, LargeText, ProgressBar, IconButton, NormalText } from '../components/index'
// import PinchableBox from '../components/PinchableBox';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';




export default class Criminal extends Component {

  /**
   * Log out an example event after zooming
   *
   * @param event
   * @param gestureState
   * @param zoomableViewEventObject
   */

  constructor(props) {
    super(props);

    this.state = {
      // data: [],
      cover: null,
      title: '',
      isLoading: true,
      // resp:'',
    };

  }


  logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
    console.log('');
    console.log('');
    console.log('-------------');
    console.log('Event: ', event);
    console.log('GestureState: ', gestureState);
    console.log('ZoomableEventObject: ', zoomableViewEventObject);
    console.log('');
    console.log(`Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`);
  }


  componentDidMount() {
    const { route } = this.props;
    const param_key = route.params.paramKey
    this.setState({ title: param_key })

    RNFetchBlob.fetch('GET', 'http://book-test-cover.herokuapp.com/api/render/',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'application/Json',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('getting data from fetch', data)

        this.setState({ cover: data.resp, isLoading: false });
        console.log(this.state.cover)
      })

      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }


  render() {
    const { navigate } = this.props.navigation;
    const { cover, title, isLoading } = this.state;



    return (
      <View style={styles.container}>
        <Header menuColor={"#7519FB"} />

        <View style={{ alignSelf: 'stretch', marginHorizontal: 30, paddingTop: 30,}}>
          <LargeText
            text={'Result:'}
          />
          <NormalText text={this.state.title} />
          {/* <Text>{this.updateValue(param_key, 'title')}</Text> */}

        </View>


        {/* {console.log(this.state.title)} */}
        <View style={{
          height: 400, borderColor: '#FFBEBE',
          borderRadius: 10,
          marginTop: 0,
          borderStyle: 'dashed',
          borderWidth: 2,
        }}>
          <ReactNativeZoomableView
            maxZoom={2.0}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            onZoomAfter={this.logOutZoomState}
            style={{
              padding: 10,
            }}
          >
            <Image
              style={{
                flex: 1,
                alignSelf: 'center',
                width: 400,
                // height: 100,
              }}
              source={{ uri: 'http://book-test-cover.herokuapp.com/' + this.state.cover }}
              resizeMode="contain"
              indicator={Progress.Pie}
              indicatorProps={{
                size: 80,
                borderWidth: 0,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}

              style={{
                width: 320,
                height: 240,
              }}
            />
            {/* <Image style={{ flex: 1, width: null, height: '100%' }}
                 source={require('./image.jpg')}
                resizeMode="contain" /> */}
          </ReactNativeZoomableView>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', marginHorizontal: 20, height: 70, alignItems: 'center' }}>
          {/* TAKES TO FIRST DETAILS SCREEN */}
          <TouchableOpacity onPress={() => {
            navigate("Home");
          }}>
            <IconButton iconName={"chevron-left"} menuColor={"#6202EE"} text={"BACK"} iconSideLeft={true} />
          </TouchableOpacity>

          {/* RENDER SCREEN */}

          <TouchableOpacity onPress={() => {
            navigate('Dashboard');
          }}>
            <IconButton iconName={"chevron-right"} menuColor={"#6202EE"} text={"NEXT"} iconSideLeft={false} />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
  },
})