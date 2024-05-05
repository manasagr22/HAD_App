import React from 'react';
import { View, Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const AudioPlayer = ({ audioPath }) => {
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const startPlayback = async () => {
    const result = await audioRecorderPlayer.startPlayer(audioPath);
    console.log(result);
  };

  const stopPlayback = async () => {
    const result = await audioRecorderPlayer.stopPlayer();
    console.log(result);
  };

  return (
    <View>
      <Button title="Start Playback" onPress={startPlayback} />
      <Button title="Stop Playback" onPress={stopPlayback} />
    </View>
  );
};

export default AudioPlayer;
