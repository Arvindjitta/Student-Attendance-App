// App.js
// Third-app:- This app allows user to capture images and send those
// Images to 000.webhost/sumbit.php file 

// Status:-working fine

// Last_checked:- 19-2-2020
  
 
  import React, {Component} from 'react';
  import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import ImagePicker from 'react-native-image-picker';
  import RNFetchBlob from 'rn-fetch-blob';
  const options = {
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  };
  export default class App extends Component {
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

    myfun = () => {
      //alert('clicked');
 ImagePicker.showImagePicker(options, response => {     
   console.log('Response = ', response);
 
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image Picker Error: ', response.error);
        } else {
          let source = {uri: response.uri};
          this.setState({
            avatarSource: source,
            cover: response.data,
          });
        }
      });
    };
 
 
    uploadPic = () => {
      
      // alert('ddf');
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
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>

          <Image
            source={this.state.avatarSource}
            style={{width: '100%', height: 300, margin: 10}}
          />

          <TouchableOpacity
            style={{backgroundColor: 'green', margin: 10, padding: 10}}
            onPress={this.myfun}
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
 

