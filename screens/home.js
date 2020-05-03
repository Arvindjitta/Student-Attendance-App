// import  React from 'react';
// import { View, Text, Button } from 'react-native';

// export default function HomeScreen ({ navigation }) {
//     return(
//       <View>
//         <Text>Hello world!!!</Text>
//         <Button
//           title="Go to Details"
//           onPress={() => navigation.navigate('Details')}
//         />
//       </View>
//     )
//   }


import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';



const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo rfrom library',
};
  
export default class Home extends Component {
constructor(props) {
  super(props);
  this.state = {
    avatarSource: null,
    pic: null,
    cover:null,
    title:'',
  };
}           
    
updateValue(text, field) {
  if (field == 'title') {
    this.setState({
      title: text,
    });
  }
}

PicImage = () => {
//alert('clicked');
ImagePicker.showImagePicker(options, response => {     
console.log('Response = ', response);
 
if (response.didCancel) {
  console.log('User cancelled image picker');
  }

  else if (response.error) {
    console.log('Image Picker Error: ', response.error);
    } 
        
    else {
      let source = {uri: response.uri};
        this.setState({
          avatarSource: source,
          cover: response.data,
        });
    }
  });
};
 
 
uploadPic = () => {
  
  RNFetchBlob.fetch(
    'POST',
    'http://book-cover-test.herokuapp.com/books/',

    {
      Authorization: 'Bearer access-token',
      otherHeader: 'foo',
      'Content-Type': 'multipart/form-data',
    },
    [
      {name: 'title', data: this.state.title},
      {
        name: 'cover',
        filename: 'image.png',
        type: 'image/png',
        data: this.state.cover,
      },
    ]
  ).then(resp => {
    console.log(resp);
    alert('your image uploaded successfully');
    this.setState({avatarSource: null});
  });
};
 
  render() {
    
    const { navigation } = this.props;
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>

        <Image
          source={this.state.avatarSource}
          style={{width: '100%', height: 300, margin: 10}}
        />

        <TouchableOpacity
          style={{backgroundColor: 'green', margin: 10, padding: 10}}
          onPress={this.PicImage}
          >
        <Text style={{color: '#fff'}}>Select Image</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => this.updateValue(text, 'title')}
        />

        <TouchableOpacity onPress={this.uploadPic}>
          <Text>Upload</Text>
        </TouchableOpacity>

        <Button 
        navigation={ this.props.navigation } 
        title="Go to Details"
        onPress={() => navigation.navigate('Criminal')}
      />
      </View>
    );
  }
}
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
 


  