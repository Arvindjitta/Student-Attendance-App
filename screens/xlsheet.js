import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, PermissionsAndroid } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';

export default class xlsheet extends Component {

    componentDidMount() {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((result) => {
                if (result) {
                    console.log(result);
                } else if (result) {
                    console.log("User refuse");
                }
                else {
                    console.log("User refuse");
                }
            });
        }
    }


//   signalError = () => {
//     showMessage(i18n.t('file_download_failed'), colors.RED);
//   };

//  signalSuccess = () => {
//     showMessage(i18n.t('file_download_success'), colors.GREEN);
//   };




//     const {
//       dirs: { DownloadDir, DocumentDir },
//     } = RNFetchBlob.fs;
//     const isIOS = Platform.OS === 'ios';
//     const directoryPath = Platform.select({
//       ios: DocumentDir,
//       android: DownloadDir,
//     });
//     const filePath = `${directoryPath}/${file.name}`;
//     const fileExt = file.ext;
//     var mimeType = '';

//     if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {
//       mimeType = 'image/*';
//     }
//     if (fileExt === 'pdf') {
//       mimeType = 'application/pdf';
//     }
//     if (fileExt === 'avi' || fileExt === 'mp4' || fileExt === 'mov') {
//       mimeType = 'video/*';
//     }

//     const configOptions = Platform.select({
//       ios: {
//         fileCache: true,
//         path: filePath,
//         appendExt: fileExt,
//         notification: true,
//       },
//       android: {
//         fileCache: true,
    
//         addAndroidDownloads: {
//           useDownloadManager: true,
//           mime: mimeType,
//           title: file.name,
//           mediaScannable: true,
//           notification: true,
//         },
//       },
//     });

    downloadFile = () => {
        // const { fs } = RNFetchBlob;
        const downloads = RNFetchBlob.fs.dirs.DownloadDir;
        // let downloads = RNFetchBlob.fs.dirs.DocumentDir
        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache: true,
                appendExt: 'xlsx',
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                addAndroidDownloads: {
                    useDownloadManager: true,
                    title: 'dict1.xlsx',
                    mediaScannable: true,
                    notification: true,
                    description: 'File downloaded by downlaod Manager',
                    path: `${downloads}dict1.xlsx`,
                }

            })
            .fetch('GET', 'http://10.0.0.2:8000/modia/covers/xlsx_shes/dict1.xlsx')
            .then((res) => {
                console.log(res.path())
                const shareOptions = {
                    title: 'Share via',
                    message: 'Do not miss to share meme sounds',
                    url:res.path(),
                  };
                  Share.share(shareOptions)
                    .then((res) => console.log(res))
                    .catch((err) => err && console.log(err))
                })
            .catch((error)=>{
                console.log('general error: ', error)
            });
            
    };
   

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <TouchableOpacity onPress={this.downloadFile()}>
                    <View style={{ width: 50, height: 50, backgroundColor: 'red' }}></View>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({})
