import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Button, PermissionsAndroid } from 'react-native';
import { Buffer } from 'buffer'
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';

export default function AudioRecorder(props) {
  var sound = null;
  const [audioFile, setAudioFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);
  //
  useEffect(() => {
    async function initAudio() {
      await checkPermission();
      const options = {
        sampleRate: 16000,
        channels: 1,
        bitsPerSample: 16,
        audioQuality: "High",
        wavFile: 'test.wav'
      }
      AudioRecord.init(options)

      AudioRecord.on('data', data => {
        const chunk = Buffer.from(data, 'base64')
      })
    }
    initAudio();
  }, [])



  const checkPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Recording Permission",
        message: "Grant Permission to Record Audio",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "Ok"
      }
    )

    const p = await Permissions.check('microphone');
    if (p === 'authorized') return;
    return requestPermission();
  }

  const requestPermission = async () => {
    const p = await Permissions.check('microphone');
  }

  useEffect(() => {
    const start = () => {
      props.setSound(null);
      props.setLoaded(false);
      setAudioFile(null);
      AudioRecord.start();
    }

    const stop = async () => {
      let audioFile = await AudioRecord.stop();
      console.log(audioFile);
      const audioContent = await RNFS.readFile(audioFile, 'base64');
      props.setAudioFile(audioContent);
      props.handledescriptive(props.currQInd, audioContent);
    }


    if (props.recording)
      start();
    else if (props.recording === false) {
      stop();
    }
  }, [props.recording])

  return (
    <View >
    </View>
  );
}