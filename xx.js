  App working fine sending title details to server
 
 
  import React, {Component } from 'react';
  import {StyleSheet,Text,File,View, TouchableOpacity,TextInput, Image,} from 'react-native';
 
  class App extends Component {
    constructor() {
      super();
      this.state = {
        title: '',
        name: '',
        photo: '',
        image: ''
      };
    }
 
    updateValue(text, field) {
      if (field == 'photo') {
        this.setState({
          photo: Image,
        });
      } else if(field == 'title') {
        this.setState({
          title: text,
        });
      }
    }
 
    handleChoosePhoto = () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          this.setState({photo: response});
        }
      });
    };
 
  
    submit() {
 
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('title', title);
        formData.append('cover', fileField.files[0]);

        fetch('http://book-cover-test.herokuapp.com/books', {
        method: 'PUT',
        body: formData
        })
        .then((response) => response.json())
        .then((result) => {
        console.log('Success:', result);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
 
 
    //   let collection = {};
    //   (collection.name = this.state.name),
    //   (collection.title = this.state.title);
    //   (collection.photo = this.state.photo);
     
 
    //   console.warn(collection);
 
    //   fetch('http://book-cover-test.herokuapp.com/books/', {
    //     method: 'POST', // or 'PUT'
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(collection),
    //   })
    //     .then(response => response.json())
    //     .then(collection => {
    //       console.log('Success:', collection);
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    }
 
    render() {
      return (
        <View style={styles.container}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={text => this.updateValue(text, 'name')}
          />
 
          <TextInput
            placeholder="Title"
            style={styles.input}
            onChangeText={text => this.updateValue(text, 'title')}
          />
 
          <TouchableOpacity
            onPress={() => this.handleChoosePhoto()}
            style={styles.btn}
          >
            <Text>Choose Photo</Text>
          </TouchableOpacity>
 
          <TouchableOpacity onPress={() => this.submit()} style={styles.btn}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
 
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      justifyContent: 'center',
    },
 
    btn: {
      backgroundColor: 'skyblue',
      padding: 10,
      height: 40,
      color: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
 
  export default App
 

