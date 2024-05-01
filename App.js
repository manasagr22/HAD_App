import React, { useEffect, useRef, useState } from 'react';
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
import Chat from './Components/ChatBox/Chat';
import Spinner from './Components/Spinner';
import Alert from './Components/Alert';
import LoggedInPatient from './Components/LoggedInPatient';
import PatientQn from './Components/PatientQn';
import NavBarPatient from './Components/NavBarPatient';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [jwtToken, setJwtToken] = useState(null);
  const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState(null);
  const URL = "https://8d6e-103-156-19-229.ngrok-free.app";
  // const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  const getData = async (val) => {
    try {
      const value = await AsyncStorage.getItem(val);
      return value;
    } catch (e) {
      return null
    }
  };

  const storeData = async (val, value) => {
    try {
      await AsyncStorage.setItem(val, value);
    } catch (e) {
      ;
    }
  };

  async function clear() {
    await AsyncStorage.clear();
  }

  useEffect(() => {
    async function checkToken() {

      if (jwtToken === null) {
        const jwt = await getData("/");
        if (jwt === "" || jwt === null);
        else {
          setJwtToken(jwt);
        }
      }
      else {
        try {
          const key = "Bearer " + jwtToken;
          const res = await fetch(URL + "/fw/isLoggedIn", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": key
            }
          })
          if (!res.ok) {
            clear();
          }
          else {
            if (await res.json()) {
              await storeData("/", jwtToken)
            }
            else {
              clear();
            }
          }
        }
        catch {
          clear();
        }
      }
    }
    checkToken();
    // clear();
  }, [jwtToken])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}
      accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login">
                {() => <LoginFW load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} setJwtToken={setJwtToken} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>
              <Stack.Screen name="Dashboard">
                {() => <DashboardParent load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>
              <Stack.Screen name='Chat'>
                {() => <Chatting load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>
              <Stack.Screen name='Register'>
                {() => <Register load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>
              <Stack.Screen name='Login Patient'>
                {() => <LoginPat load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>

              <Stack.Screen name='Patient Questionnaire'>
                {() => <PatientQuesn load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>

              <Stack.Screen name='LoggedIn Patient'>
                {() => <LoggedPat load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
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
  const URL = "https://8d6e-103-156-19-229.ngrok-free.app";

  async function clear() {
    await AsyncStorage.clear();
  }

  useEffect(() => {
    async function checkToken() {

      if (props.jwtToken === null) {
        const jwt = await props.getData("/");
        if (jwt === "" || jwt === null);
        else {
          props.setJwtToken(jwt);
        }
      }
      else {
        try {
          const key = "Bearer " + props.jwtToken;
          const res = await fetch(URL + "/fw/isLoggedIn", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": key
            }
          })
          if (!res.ok) {
            clear();
          }
          else {
            const r = await res.json();
            if (r == true) {
              await props.storeData("/", props.jwtToken)
              navigation.navigate("Dashboard")
            }
            else {
              clear();
            }
          }
        }
        catch (e) {
          console.log(e)
          clear();
        }
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
        <Login navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} storeData={props.storeData} getData={props.getData} />
      </View>
    </View>
  )
}

const DashboardParent = (props) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.background, styles.container]}>
      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}
      <View style={{ width: '100%', flex: 1, flexDirection: "column" }}>
        <NavBar navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
      </View>
    </View>
  )
}

const Register = (props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState([false, 0]);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardVisible([true, endCoordinates.screenY]);
        const keyboardHeight = Dimensions.get('window').height - endCoordinates.screenY;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      ({ endCoordinates }) => {
        setKeyboardVisible([false, endCoordinates.screenY]);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const scrollViewRef = useRef();

  return (
    <View style={[styles.background, styles.container]}>
      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}
      <View style={{ width: '100%', flex: 1, flexDirection: "column" }}>
        <NavBar navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
        <ScrollView ref={scrollViewRef}>
          <RegisterPatient navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} scrollViewRef={scrollViewRef} />
        </ScrollView>
      </View>
    </View>
  )
}

const LoginPat = (props) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.background, styles.container]}>
      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}
      <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
        <NavBar navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
        <ScrollView>
          <LoginPatient navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} />
        </ScrollView>
      </View>
    </View>
  )
}

const Chatting = (props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState([false, 0]);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardVisible([true, endCoordinates.height]);
        const keyboardHeight = Dimensions.get('window').height - endCoordinates.screenY;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible([false, 0]);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={[styles.background, styles.container]}>
      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}
      <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
        <NavBar navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
        <Chat navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} />
      </View>
    </View>
  )
}

const LoggedPat = (props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState([false, 0]);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardVisible([true, endCoordinates.height]);
        const keyboardHeight = Dimensions.get('window').height - endCoordinates.screenY;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible([false, 0]);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (<View style={[styles.background, styles.container]}>
    {props.load ? <Spinner /> : undefined}
    {props.alert ? <Alert alert={props.alert} /> : undefined}
    <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height, alignItems: 'center' }}>

      <NavBarPatient navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />

      <View style={styles.boxcontainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={[styles.title, styles.blueText]}>Medimate</Text>
      </View>
      
    </View>
  </View>)
}

const PatientQuesn = (props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState([false, 0]);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardVisible([true, endCoordinates.height]);
        const keyboardHeight = Dimensions.get('window').height - endCoordinates.screenY;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible([false, 0]);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={[styles.background, styles.container]}>

      <NavBarPatient navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />


      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}

      <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
        <PatientQn navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} />

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
  boxcontainer: {
    marginTop: '10%',
    height: '30%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color of the box
    borderRadius: 10, // Rounded corners
    padding: 10, // Padding around the content
    shadowColor: '#000000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android shadow
  },
  welcomeText: {
    fontSize: 48, // Font size of "Welcome to"
    textAlign: 'center', // Center-align the text
  },
  title: {
    fontSize: 40, // Font size of "Medimate"
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center', // Center-align the text
  },
  blueText: {
    color: '#9141ac', // Blue color for "Medimate"
  },
});

export default App;