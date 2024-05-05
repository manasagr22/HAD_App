// import React, { Component } from 'react';
// import { StyleSheet, View, Button, PermissionsAndroid } from 'react-native';
// import { Buffer } from 'buffer'
// import { Permissions } from 'react-native-permissions';
// import Sound from 'react-native-sound'
// import AudioRecord from 'react-native-audio-record';

// export default class AudioRecorder extends Component {
//   sound = null;
//   state = {
//     audioFile: '',
//     recording: false,
//     loaded: false,
//     paused: true
//   }

//   async componentDidMount() {
//     await this.checkPermission();

//     const options = {
//       sampleRate: 16000,
//       channels: 1,
//       bitsPerSample: 16,
//       audioSource: AudioRecorder.AudioSource.MIC,
//       audioQuality: "High",
//       wavFile: 'test.wav'
//     }
//     AudioRecord.init(options)

//   }


//   render() {
//     return (
//       <View >
//         hello
//       </View>
//     );
//   }
// }