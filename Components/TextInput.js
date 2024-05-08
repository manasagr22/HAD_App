import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const MyTextInput = () => {
  const [text, setText] = useState('');

  const onChangeText = (inputText) => {
    setText(inputText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type something..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '30%'
  },
  input: {
    width: '15%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default MyTextInput;
