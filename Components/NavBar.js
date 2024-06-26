import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Notification from './Notification';
import NotificationNumber from './NotificationNumber';
import io from 'socket.io-client';

export default function NavBar(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [countNotification, setCountNotification] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const SOCKET_URL = "https://dd99-119-161-98-68.ngrok-free.app"
  const [msgReceived, setMsgReceived] = useState(null);

  useEffect(() => {
    async function connectSocket() {
      const email = await props.getData("email")
      if (!email)
        props.navigate("Login");

      const s = io(SOCKET_URL, {
        reconnection: false,
        query: `email=${email}&room=NotificationRoom`, //"room=" + room+",username="+username,
      });

      s.on('connect', () => {
        //console.log('Connected!');
      });

      s.on('receive_notification', (message) => {
        //console.log(message);
        setMsgReceived(message)
        console.log('Received message:', message);
      });

      return () => {
        //console.log('Disconnecting socket...');
        s.disconnect();
      };
    }
    connectSocket();
  }, [])

  useEffect(() => {
    if(msgReceived) {
      updateReceiverMessage(msgReceived)
    }
  }, [msgReceived])

  const updateReceiverMessage = async(message)  => {
    if(!countNotification) {
      setCountNotification(1)
      props.setFwNotification(1)
    }
    else {
      setCountNotification(countNotification+1)
      props.setFwNotification(countNotification + 1)
    }
  }

  useEffect(() => {
    async function getNotifications() {
      const result = await fetch(props.URL+"/fw/viewAllTasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + props.jwtToken
        }
      }).then(res =>res.json());

      if(result && result.length > 0) {
        setNotifications(result);
      }
    }

    if(!notifications && props.jwtToken) {
      getNotifications();
    }
    else if(notifications) {
      //console.log(notifications.length)
      setCountNotification(notifications.length)
      props.setFwNotification(notifications.length)
    }
  }, [notifications, props.jwtToken])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handlePress = (index) => {
    setActiveIndex(index);
    // Perform navigation or other actions here
  };

  async function clear() {
    await AsyncStorage.clear();
  }

  async function logOut() {
    try {
      props.setLoad(true);
      const url = props.URL + "/auth/logout"
      const key = "Bearer " + props.jwtToken;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: key
        })
      });

      props.setLoad(false);

      if (!response.ok)
        props.setAlert({ type: "danger", msg: "Some Error Occurred!" });
      else {
        const result = await response.json();
        if (result === true) {
          // clear();
          await AsyncStorage.removeItem("/");
          props.navigate("Login");
        }
        else {
          props.setAlert({ type: "danger", msg: "Some Error Occurred!" });
        }
      }

      setTimeout(() => {
        props.setAlert(null);
      }, 1800);
    }
    catch {
      props.setLoad(false);
      props.setAlert({ type: "danger", msg: "Some Error Occurred!" });
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image source={require('../Images/Logo_Name.png')} style={{ width: "65%", height: "70%", marginTop: 'auto', marginBottom: 'auto', marginRight: 'auto' }} />
      </View>

      <View style={styles.navItems}>
        <TouchableOpacity
          style={[styles.navItem, activeIndex === 0 && styles.activeNavItem]}
          onPress={() => {
            props.navigate("Dashboard")
            handlePress(0)}}
          activeOpacity={1}
        >
          <Text style={[styles.navText, activeIndex === 0 && styles.activeNavText]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeIndex === 1 && styles.activeNavItem]}
          onPress={() => handlePress(1)}
          activeOpacity={1}
        >
          <Text style={[styles.navText, activeIndex === 1 && styles.activeNavText]}>Supervisor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeIndex === 2 && styles.activeNavItem]}
          onPress={() => handlePress(2)}
          activeOpacity={1}
        >
          <Text style={[styles.navText, activeIndex === 2 && styles.activeNavText]}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => props.navigate("Login Patient")}>
          <Text style={styles.buttonText}>Login Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} activeOpacity={1} onPress={() => props.navigate("Register")}>
          <Text style={styles.buttonText}>Register Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarButton} onPress={toggleMenu} activeOpacity={1}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' }} style={styles.avatar} />
          {countNotification !== null && countNotification !== 0 ? <Notification/> : undefined}
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}
            onPress={() => {
              setMenuVisible(false)
            }} activeOpacity={1}></TouchableOpacity>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={1}>
              <Text style={styles.menuItemText}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={1} onPress={() => props.navigate("Inbox")}>
              <Text style={styles.menuItemText}>Inbox</Text>
              {countNotification && countNotification !== 0 ? <NotificationNumber countNotification={countNotification}/> : undefined}
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={1} onPress={() => {
              handlePress(5)
              props.navigate("Chat")}}>
              <Text style={styles.menuItemText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={1}>
              <Text style={styles.menuItemText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={logOut}>
              <Text style={[styles.menuItemText, styles.logoutButtonText]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 0.1,
    flexDirection: "row",
    backgroundColor: 'rgb(238 238 238)',
    elevation: 4,
    borderBottomWidth: 1, // Add bottom line
    borderBottomColor: '#D3D3D3',
    height: 65
  },
  imgContainer: {
    flex: 0.3,
    marginLeft: 10,
    height: "100%",
    // backgroundColor: "green"
  },
  navItems: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 200,
    // backgroundColor: "red",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navText: {
    // color: '#667EEA', // Indigo color
    color: "gray",
    fontWeight: '600', // Font weight
    fontSize: 16
  },
  activeNavItem: {
    // backgroundColor: '#EDF2F7', // Light gray background
    borderRadius: 4,
  },
  activeNavText: {
    color: '#3B82F6', // Dark indigo color
  },
  buttonsContainer: {
    flex: 0.4,
    // backgroundColor: "green",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: "100%"
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#667EEA',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  secondaryButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  avatarButton: {
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: -12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 50,
    width: "20%",
    position: "absolute",
    top: 7,
    right: -10
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: 'black',
  },
  logoutButton: {
    borderBottomWidth: 0, // Remove border for the last item
  },
  logoutButtonText: {
    color: 'red',
  },
})
