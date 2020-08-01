import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      pic: null,
      cover: null,
      title: '',
    };
  }

  updateValue(text, field) {
    if (field == 'title') {
      this.setState({
        title: text,
      });
    }
  }

  // To retrive images from the mobile
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
        let source = { uri: response.uri };
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
      'http://book-test-cover.herokuapp.com/books/',
      // 'http://10.0.2.2:8000/books/',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        { name: 'title', data: this.state.title },
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
      this.setState({ avatarSource: null });
    });
  };

  render() {

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
          <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={text => this.updateValue(text, 'title')}
        />
        <View style={styles.container2}>
          <Image
            style={{
              flex: 1,
              alignSelf: 'center',
              width: 400,
              // height: 100,
            }}
            source={this.state.avatarSource}
            resizeMode="contain"
          />
        </View>
        <View style={styles.container3}>
          <TouchableOpacity
            style={{ backgroundColor: 'green', margin: 10, padding: 10 }}
            onPress={this.PicImage}>
            <Text style={{ color: '#fff' }}>Select Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: 'green', margin: 10, padding: 10 }}
            onPress={this.uploadPic}>
            <Text style={{ color: '#fff' }}>Upload</Text>
          </TouchableOpacity>
        </View>


      
        <View>

          <Button

            navigation={this.props.navigation}
            title="go to criminals"
            onPress={() =>
              navigation.navigate('Criminal')}
          />


          <Button

            navigation={this.props.navigation}
            title="go to Render"
            onPress={() =>
              navigation.navigate('Render')}
          />

        </View>
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
    padding: 5,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'red'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container2: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  container3: {
    // flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor: 'white',
  },
});



