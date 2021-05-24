import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';


export default class testing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data: [],
      cover:null,
      title:'',
      isLoading: true
    };
  }

  
  
  componentDidMount() {

    RNFetchBlob.fetch('GET','http://book-test-cover.herokuapp.com/api/',
     {
      Authorization: 'Bearer access-token',
      otherHeader: 'foo',
      'Content-Type': 'application/Json',
      }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log('getting data from fetch', data)
       
        this.setState({ cover: data.cover, title: data.title, isLoading: false });
        console.log(this.state.cover)
      })

      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
    }


  render() {

    const { cover, title, isLoading  } = this.state;
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
            source={{uri: 'http://book-test-cover.herokuapp.com' + this.state.cover}}
            resizeMode="contain"
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
      padding:10,
    }
  })