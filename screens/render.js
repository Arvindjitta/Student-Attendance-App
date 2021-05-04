import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';




export default class Criminal extends Component {
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



  componentDidMount() {

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

    const { cover, title, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Text>{this.state.title}</Text>

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
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
    padding: 10,
  },
})