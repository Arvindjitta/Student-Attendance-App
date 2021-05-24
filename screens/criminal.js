import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Header, LargeText, ProgressBar, IconButton } from '../components/index';
import { Dropdown } from 'react-native-material-dropdown-v2';




const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classDetails: null,
      selectedValue: null,
      branchValue: null,
      yearValue: null,
      sectionValue: null,
      semisterValue: null,


      // written: null,
      // total: 1000,
    };
  }

  // componentDidMount() {

  //   if (Platform.OS === 'android') {
  //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
  //       if (result) {
  //         console.log("Permission is OK for camera checked");
  //       } else {
  //         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
  //           if (result) {
  //             console.log("Permission is OK for camera requested");
  //           } else if (result) {
  //             console.log("User refuse");
  //           }
  //           else {
  //             console.log("User refuse");

  //           }
  //         });
  //       }
  //     });
  //   }
  // }

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
  onChangeHandler = (value) => {
    this.setState({ semisterValue: value })
    var van = this.state.branchValue + '-' + this.state.yearValue + '-' + this.state.sectionValue + '-' + this.state.semisterValue
    this.setState({ classDetails: van })
    var det = this.state.classDetails
    console.log({ det })

  }

  render() {
    const { navigate } = this.props.navigation
    var van = this.state.yearValue + '-' + this.state.branchValue + '-' + this.state.sectionValue + '-' + this.state.semisterValue
    // console.log({ van })
    // this.setState({classDetails: van})

    let branchValue = [{
      value: 'CSE',
    }, {
      value: 'EEE',
    }, {
      value: 'ECE',
    }, {
      value: 'CIVIL',
    }, {
      value: 'MECH',
    }, {
      value: 'IT',
    }];

    let yearValue = [{
      value: 'I',
    }, {
      value: 'II',
    }, {
      value: 'III',
    }, {
      value: 'IV',
    }];

    let sectionValue = [{
      value: 'A',
    }, {
      value: 'B',
    }, {
      value: 'C',
    }, {
      value: 'D',
    }];

    let semisterValue = [{
      value: '1st sem',
    }, {
      value: '2nd sem',
    }];

    return (
      <View style={styles.container}>

        <View style={{
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        }}>

          <Header menuColor={"#7519FB"} />


          {/* Dashed Image Container */}

          <View style={styles.container2}>
            <Image
              style={{
                // backgroundColor: 'red',
                alignSelf: 'center',
                height: 190,
                borderRadius: 10,
                // paddingTop: 50,
                width: '100%',
                // marginHorizontal: 20,
              }}
              source={require('../assets/firstImage.png')}
              resizeMode="contain"
            />
          </View>

          {/* TextHeading */}
          <View style={{
            alignSelf: 'stretch',
            marginHorizontal: 30, paddingTop: 30
          }}>
            <LargeText
              text={'Enter details'}
            />
          </View>
          {/* <Text style={{backgroundColor:'pink'}}>dd</Text> */}
          <View style={styles.container3}>
            {/* Branch */}
            <View style={{ flex: 1, }}>
              <View style={{ marginHorizontal: 10, }}>
                <Dropdown
                  label='Branch'
                  useNativeDriver={true}
                  // animationDuration={10}
                  data={branchValue}
                  // dropdownOffset={15,2}
                  onChangeText={value => this.setState({ branchValue: value })}
                />
              </View>
            </View>
            {/* Class */}
            <View style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 10, }}>
                <Dropdown
                  label='Year'
                  useNativeDriver={true}
                  // animationDuration={10}
                  data={yearValue}
                  onChangeText={value => this.setState({ yearValue: value })}
                />
              </View>
            </View>
          </View>
          {/* Second Part */}
          <View style={styles.container3}>
            {/* Section */}
            <View style={{ flex: 1, }}>
              <View style={{ marginHorizontal: 10, }}>
                <Dropdown
                  label='Section'
                  useNativeDriver={true}
                  animationDuration={10}
                  data={sectionValue}

                  onChangeText={value => this.setState({ sectionValue: value })}
                />
              </View>
            </View>
            {/* Semister */}
            <View style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 10, }}>
                <Dropdown
                  label='Semister'
                  useNativeDriver={true}
                  animationDuration={10}
                  data={semisterValue}
                  // onChangeText={value => this.setState({semisterValue:value})}   
                  onChangeText={value => this.onChangeHandler(value)}


                />
              </View>
            </View>
          </View>


        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'stretch', marginHorizontal: 20, height: 70, alignItems: 'center' }}>
          {/* TAKES TO FIRST DETAILS SCREEN */}
          {/* <TouchableOpacity onPress={() => {
            navigate("Criminal");
          }}>
            <IconButton iconName={"chevron-left"} menuColor={"#6202EE"} text={"BACK"} iconSideLeft={true} />
          </TouchableOpacity> */}

          {/* RENDER SCREEN */}

          <TouchableOpacity onPress={() => {

            // this.props.navigation.navigate('home', {
            //   paramKey: van,
            // })
            navigate('Home', { paramKey: van });
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
    // backgroundColor: 'red'
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
    // borderColor: '#FFBEBE',
    // borderRadius: 10,
    marginTop: 30,
    paddingTop: 30,
    // borderStyle: 'dashed',
    // borderWidth: 2,
    // backgroundColor: 'yellow',
    // backgroundColor: '#000',
  },
  //koool--Goolk--koool--buttton--//
  container3: {
    // flex: 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 20,
    // backgroundColor: 'yellow',
    marginHorizontal: 20,
  },
});



