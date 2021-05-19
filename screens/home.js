import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Header, LargeText, ProgressBar, IconButton } from '../components/index';




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
      total: null,
      // paramkey: props.route.params.paramKey,
      // written: null,
      // total: 1000,
    };
    
  }

  componentDidMount() {
    
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
        if (result) {
          console.log("Permission is OK for camera checked");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
            if (result) {
              console.log("Permission is OK for camera requested");
            } else if (result) {
              console.log("User refuse");
            }
            else {
              console.log("User refuse");

            }
          });
        }
      });
    }
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
    const options = {
      quality: 0.5
    };
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
    ).uploadProgress({ count: 10 }, (written, total) => {
      // this.setState({ written: written })
      total = written / total
      this.setState({ total: total })
      console.log('uploaded', total);
    }).then(resp => {
      console.log(resp);
      alert('your image uploaded successfully');
      this.setState({ avatarSource: null });
      this.setState({ total: null });
    });
  };

  render() {
    const { route } = this.props;  
    const { navigate } = this.props.navigation;  
    const param_key = route.params.paramKey
    // console.log({param_key})
    // console.log({title})
    // {JSON.stringify(paramKey)}
    // const { navigation } = this.props;
    // const { paramKey } = route.params;

    return (
      <View style={styles.container}>

        <View style={{
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        }}>

          <Header menuColor={"#7519FB"} />

          <View style={{ alignSelf: 'stretch', marginHorizontal: 30, paddingTop: 70 }}>
            <LargeText
              text= {param_key}
            />
            {/* <Text>{this.updateValue(param_key, 'title')}</Text> */}
           
          </View>

          {/* use it for sending route.param.parmkey */}
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={text => this.updateValue(text, 'title')}
          />


          {/* Dashed Image Container */}

          <View style={styles.container2}>
            <Image
              style={{
                // backgroundColor: 'red',
                alignSelf: 'center',
                height: 190,
                borderRadius: 10,
                width: '100%',
                // marginHorizontal: 20,
              }}
              source={this.state.avatarSource}
              resizeMode="contain"
            />
          </View>

          {/* Slider */}

          <View style={{ alignSelf: 'stretch', marginHorizontal: 30, paddingVertical: 10 }}>
            <ProgressBar barcolor={'rgba(255, 190, 190, 100)'} total={this.state.total} />
          </View>




          <View style={styles.container3}>
            <View style={{ flex: 1, }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#6202EE', marginHorizontal: 10, height: 60, justifyContent: 'center',
                  alignItems: 'center', elevation: 5, borderRadius: 5,
                }}
                onPress={this.PicImage}>
                <Text style={{
                  color: '#fff', fontSize: 15,
                  // fontWeight: 'bold',
                  textAlign: 'center',
                }}>Select Image</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#6202EE', justifyContent: 'center',
                  marginHorizontal: 10,
                  alignItems: 'center', elevation: 5, borderRadius: 5, height: 60, marginVertical: 10,
                }}
                onPress={this.uploadPic}>
                <Text style={{ color: '#fff' }}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', marginHorizontal: 20, height: 70, alignItems: 'center' }}>
          {/* TAKES TO FIRST DETAILS SCREEN */}
          <TouchableOpacity onPress={() => {
            navigate("Criminal");
          }}>
            <IconButton iconName={"chevron-left"} menuColor={"#6202EE"} text={"BACK"} iconSideLeft={true} />
          </TouchableOpacity>

          {/* RENDER SCREEN */}

          <TouchableOpacity onPress={() => {
            navigate("Render");
          }}>
            <IconButton iconName={"chevron-right"} menuColor={"#6202EE"} text={"NEXT"} iconSideLeft={false} />
          </TouchableOpacity>
        </View>





        {/* <View> */}

        {/* <Button

            navigation={this.props.navigation}
            title="go to criminals"
            onPress={() =>
              navigation.navigate('Criminal')}
          /> */}




        {/* <Button

            navigation={this.props.navigation}
            title="go to Render"
            onPress={() =>
              navigation.navigate('Render')}
          /> */}

        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
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
    // flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    alignSelf: "stretch",
    marginHorizontal: 30,
    flexDirection: 'row',
    borderColor: '#FFBEBE',
    borderRadius: 10,
    marginTop: 30,
    borderStyle: 'dashed',
    borderWidth: 2,
    // backgroundColor: 'yellow',
    // backgroundColor: '#000',
  },
  //koool--Goolk--koool--buttton--//
  container3: {
    // flex: 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
});



