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
  LogBox
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
import AgendaComponent from './Components/AgendaComponent';
import CalendarComponent from './Components/CalandarComponent';
import DatePatient from './Components/DateFW';
import DateFW from './Components/DateFW';
import PatientPrescr from './Components/PatientPrescr';
import Appointment from './Components/Appointent';
import DoctorQn from './Components/DoctorQn';
import moment from 'moment';
import Inbox from './Components/Inbox';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  const [jwtToken, setJwtToken] = useState(null);
  const [load, setLoad] = useState(false);
  const [alert, setAlert] = useState(null);
  const [URLMain, setURL] = useState("https://da50-103-156-19-229.ngrok-free.app");
  const [fwNotification, setFwNotification] = useState(null);

  const [currDayTaskList, setcurrDayTaskList] = useState([]);

  const [taskList, setTaskList] = useState(null);
  const [currTask, setCurrTask]  = useState(null);

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
          const res = await fetch(URLMain + "/fw/isLoggedIn", {
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
          // clear();
        }
      }
    }
    checkToken();
    // clear();
  }, [jwtToken])

  useEffect(() => {
    // get task list
  }, []);




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}
      accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/*<Stack.Screen name='Patient Questionnaire'>
                {() => <PatientQuesn URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>*/}
              <Stack.Screen name="Login">
                {() => <LoginFW URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} setJwtToken={setJwtToken} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>
              <Stack.Screen name="Dashboard">
                {() => <DashboardParent fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} taskList={taskList} setTaskList={setTaskList} currTask={currTask} setCurrTask={setCurrTask} currDayTaskList={currDayTaskList} setcurrDayTaskList={setcurrDayTaskList} />}
              </Stack.Screen>
              <Stack.Screen name='Chat'>
                {() => <Chatting fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>
              <Stack.Screen name='Register'>
                {() => <Register fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>
              <Stack.Screen name='Login Patient'>
                {() => <LoginPat fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>

              <Stack.Screen name='Patient Questionnaire'>
                {() => <PatientQuesn fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>

              <Stack.Screen name='Patient Prescription'>
                {() => <PatientPrescription fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} currTask={currTask} />}
              </Stack.Screen>

              <Stack.Screen name='Patient Appointment'>
                {() => <PatientAppointment URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} currTask={currTask}/>}
              </Stack.Screen>

              <Stack.Screen name='Doctor Questionnaire'>
                {() => <DoctorQuesn URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} currTask={currTask}/>}
              </Stack.Screen>

              <Stack.Screen name='LoggedIn Patient'>
                {() => <LoggedPat fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>

              <Stack.Screen name="Inbox">
                {() => <Inbox1 fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
              </Stack.Screen>

              <Stack.Screen name="InboxPatient">
                {() => <InboxPatient1 fwNotification={fwNotification} setFwNotification={setFwNotification} URL={URLMain} load={load} setLoad={setLoad} alert={alert} setAlert={setAlert} jwtToken={jwtToken} getData={getData} storeData={storeData} />}
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
          const res = await fetch(props.URL + "/fw/isLoggedIn", {
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
              await clear();
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
        <Login URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} storeData={props.storeData} getData={props.getData} />
      </View>
    </View>
  )
}

const DashboardParent = (props) => {

  useEffect(() => {
    // to get task list
    // view all tasks

    const fetchAllTasks = async () => {

    const url = props.URL + '/fw/viewAllTasks'

    try{
      const key = "Bearer " + props.jwtToken;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": key
        }
      }).then((res)=> res.json())

      let tasksByDate = {};

      console.log("TasksAll: ", response)

// Iterate through the taskList array and organize tasks by date
    response.forEach(task => {
      const deadlineDateString = task.deadline;
      // Parse the date string using moment
      const deadlineDate = moment(deadlineDateString);
    
      // Format the date as "YYYY-MM-DD"
      const date = deadlineDate.format('YYYY-MM-DD');
      if (!tasksByDate[date]) {
        tasksByDate[date] = [];
      }
      tasksByDate[date].push(task);
    });

    props.setTaskList(tasksByDate)

      
    }catch(err){
      props.setAlert({ type: "danger", msg: "Some Error Occurred!" });
      console.log(err)
    }
  }

    fetchAllTasks();


  }, []);



  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [items, setItems] = useState({});
  const loadItems = (day) => {
    // Simulate loading data for the selected day
    setTimeout(() => {
      const newItems = {
        [day]: [
          { name: 'Task 1', time: '10:00 AM' },
          { name: 'Task 2', time: '2:00 PM' },
          { name: 'Task 3', time: '4:30 PM' },
        ],
      };
      setItems(newItems);
    }, 1000);
  };
  const renderCustomItem = (item) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.time}</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const [currentSelectedDate, setCurrentSelectedDate] = useState("");

  return (
    <View style={[styles.background, styles.container]}>
      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}
      <View style={{ width: '100%', flex: 1, flexDirection: "column" }}>
        <NavBar fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <CalendarComponent currentSelectedDate={currentSelectedDate} setCurrentSelectedDate={setCurrentSelectedDate} taskList={props.taskList} currDayTaskList={props.currDayTaskList}/>
          <DateFW currentSelectedDate={currentSelectedDate} currTask={props.currTask} setCurrTask={props.setCurrTask} currDayTaskList={props.currDayTaskList} setcurrDayTaskList={props.setcurrDayTaskList} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} />
        </View>

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
        <NavBar fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} />
        <ScrollView ref={scrollViewRef}>
          <RegisterPatient URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} scrollViewRef={scrollViewRef} />
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
        <NavBar URL={props.URL} fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
        <ScrollView>
          <LoginPatient URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} />
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
        <NavBar URL={props.URL} fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
        <Chat URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} />
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

      <NavBarPatient fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} />

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

      <NavBarPatient fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} />


      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}

      <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
        <PatientQn URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} currTask={props.currTask}/>

      </View>



    </View>
  )
}

const PatientPrescription = (props) => {
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

      <NavBarPatient fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} currTask={props.currTask} />


      {props.load ? <Spinner /> : undefined}
      {props.alert ? <Alert alert={props.alert} /> : undefined}

      <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
        <PatientPrescr URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} currTask={props.currTask} />

      </View>



    </View>
  )

}
  const PatientAppointment = (props) => {
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
  
        <NavBarPatient URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
  
  
        {props.load ? <Spinner /> : undefined}
        {props.alert ? <Alert alert={props.alert} /> : undefined}
  
        <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
          <Appointment URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} currTask={props.currTask}/>
  
        </View>
  
      </View>
  )
}

const Inbox1 = (props) => {
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
        <NavBar fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
        <Inbox fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} />
      </View>
    </View>
  )
}

const InboxPatient1 = (props) => {
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
        <NavBarPatient fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
        <Inbox fwNotification={props.fwNotification} setFwNotification={props.setFwNotification} URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} />
      </View>
    </View>
  )
}


  const DoctorQuesn = (props) => {
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
  
        <NavBarPatient URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} />
  
  
        {props.load ? <Spinner /> : undefined}
        {props.alert ? <Alert alert={props.alert} /> : undefined}
  
        <View style={{ width: '100%', flex: 1, flexDirection: "column", height: Dimensions.get('window').height }}>
          <DoctorQn URL={props.URL} navigate={navigation.navigate} setLoad={props.setLoad} setAlert={props.setAlert} jwtToken={props.jwtToken} storeData={props.storeData} getData={props.getData} isKeyboardVisible={isKeyboardVisible} currTask={props.currTask}/>
  
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
    textAlign: 'center',
    fontFamily: 'Roboto' // Center-align the text
  },
  blueText: {
    color: '#481ee4',
    fontFamily: 'Roboto' // Blue color for "Medimate"
  },
});

export default App;