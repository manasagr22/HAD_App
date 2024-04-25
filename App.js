import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { AsyncStorage, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import CryptoJS from "crypto-js";
import RegisterPatient from './Components/RegisterPatient';
import LoginPatient from './Components/LoginPatient';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreamChat } from 'stream-chat';
import { API_KEY, USER_ID } from '@env';
import Chat from './Components/ChatBox/Chat';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [jwtToken, setJwtToken] = useState(null);

  function checkToken() {
    if (jwtToken === null) {
      const jwt = AsyncStorage.getItem("/").then(text => text.json());
      if (jwt === "" || jwt === null);
      // navigate('/', { replace: true });
      else {
        console.log(decryptData(jwt))
        setJwtToken(decryptData(jwt));
      }
    }
    else {
      const jwt = JSON.parse(localStorage.getItem("/"));
      if (jwt === null);
      // navigate('/', { replace: true });
    }
  }

  function encryptData(text) {
    const secretPass = "XkhZG4fW2t2W27ABbg";
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();
    return data;
  }

  function decryptData(text) {
    const secretPass = "XkhZG4fW2t2W27ABbg";
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  }

  const Stack = createNativeStackNavigator();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}
      accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Chat' component={Chatting} />
              <Stack.Screen name="Login" component={LoginFW} />
              <Stack.Screen name='Register' component={Register} />
              <Stack.Screen name='Login Patient' component={LoginPat} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const LoginFW = (props) => {
  // function navigate(to) {
  //   console.log("Reached")
  //   props.navigation.navigate(to);
  // }

  return (
    <View style={[styles.background, styles.container]}>
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.background} source={require('./Images/hospital1.png')} resizeMode='cover' />
        <View style={styles.overlay} />
        <Login navigate={props.navigation.navigate} />
      </View>
    </View>
  )
}

const Register = (props) => {
  return (
    <View style={[styles.background, styles.container]}>
      <View style={{ width: '100%', flex: 1, flexDirection: "column" }}>
        <NavBar navigate={props.navigation.navigate} />
        <ScrollView>
          <RegisterPatient navigate={props.navigation.navigate} />
        </ScrollView>
      </View>
    </View>
  )
}

const LoginPat = (props) => {
  return (
    <View style={[styles.background, styles.container]}>
      <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
        <NavBar navigate={props.navigation.navigate} />
        <ScrollView>
          <LoginPatient navigate={props.navigation.navigate} />
        </ScrollView>
      </View>
    </View>
  )
}

const Chatting = (props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState([false, 0]);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardVisible([true, endCoordinates.height]); // or some other action
        const keyboardHeight = Dimensions.get('window').height - endCoordinates.screenY;
        // setKeyboardSpace(endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible([false, 0]); // or some other action
        // setKeyboardSpace(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={[styles.background, styles.container]}>
      <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
        <NavBar navigate={props.navigation.navigate} />
        {/* <ScrollView> */}
        <Chat navigate={props.navigation.navigate} isKeyboardVisible={isKeyboardVisible}/>
        {/* </ScrollView> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Adjust opacity as needed
  },
});

export default App;