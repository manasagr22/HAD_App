import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import RegisterPatient from './Components/RegisterPatient';
import LoginPatient from './Components/LoginPatient';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreamChat } from 'stream-chat';
import { API_KEY, USER_ID } from '@env';
import Chat from './Components/ChatBox/Chat';
import Spinner from './Components/Spinner';
import Alert from './Components/Alert';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [jwtToken, setJwtToken] = useState(null);
  const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState(null);

  const Stack = createNativeStackNavigator();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}
      accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login">
                {() => <LoginFW load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} setJwtToken={setJwtToken} jwtToken={jwtToken} />}
              </Stack.Screen>
              <Stack.Screen name="Dashboard">
                {() => <DashboardParent load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} />}
              </Stack.Screen>
              <Stack.Screen name='Chat'>
                {() => <Chatting load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} />}
              </Stack.Screen>
              <Stack.Screen name='Register'>
                {() => <Register load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} />}
              </Stack.Screen>
              <Stack.Screen name='Login Patient'>
                {() => <LoginPat load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const LoginFW = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("/");
        return value;
      } catch (e) {
        return null
      }
    };

    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('/', value);
      } catch (e) {
        ;
      }
    };

    async function checkToken() {

      if (props.jwtToken === null) {
        const jwt = await getData();
        if (jwt === "" || jwt === null);
        else {
          props.setJwtToken(jwt);
        }
      }
      else {
        await storeData(props.jwtToken)
        navigation.navigate("Dashboard")
        // const jwt = JSON.parse(localStorage.getItem("/"));
        // if (jwt === null);
        // // navigate('/', { replace: true });
      }
    }

    checkToken();
  }, [props.jwtToken])

  return (
    <View style={[styles.background, styles.container]}>
      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.background} source={require('./Images/hospital1.png')} resizeMode='cover' />
        <View style={styles.overlay} />
        <Login navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} />
      </View>
    </View>
  )
}

const DashboardParent = (props) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.background, styles.container]}>
      <View style={{ width: '100%', flex: 1, flexDirection: "column" }}>
        <NavBar navigate={navigation.navigate} />
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
        <Chat navigate={props.navigation.navigate} isKeyboardVisible={isKeyboardVisible} />
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