import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import ChannelList from './ChannelList';
import Data from './dummy.json';
import UserTitle from './UserTitle';
import InputBox from './InputBox';
import MessageBox from './MessageBox';

export default function Chat(props) {
  const [data, setData] = useState(null);
  const [chatDataWithLabels, setChatDataWithLabels] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [topPadding, setTopPadding] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [countMessages, setCountMessages] = useState(0);
  const [user, setUser] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    // console.log(props.isKeyboardVisible);
    ;
  }, [props.isKeyboardVisible])

  useEffect(() => {
    function getCorrectDate(date) {
      const parts = date.split("/");
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    function getChatDataWithLabels() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const processedData = [];

      for (const date in chatData) {
        const messageDate = new Date(getCorrectDate(date));

        let dateLabel;
        if (messageDate.toDateString() === today.toDateString()) {
          dateLabel = "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
          dateLabel = "Yesterday";
        } else {
          dateLabel = date;
        }

        processedData.push({
          dateLabel: dateLabel,
          messages: chatData[date]
        });
      }

      return processedData;
    }
    if (chatData && user) {
      setChatDataWithLabels(getChatDataWithLabels(chatData));
    }
  }, [chatData, user])

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };

  const indianTime = new Date().toLocaleTimeString('en-US', options);

  useEffect(() => {
    if (topPadding === null) {
      const len = Data.length;
      setTopPadding((len / 6.5) * 14);
    }
  }, [topPadding])

  useEffect(() => {
    if (searchText !== null && searchText !== "") {
      const list = [];
      Data.forEach((item) => {
        if (item.name.startsWith(searchText))
          list.push(item)
      })
      setData(list);
    }
    else {
      setData(Data);
    }
  }, [searchText])

  useEffect(() => {
    if (chatDataWithLabels !== null) {
      if (flatListRef.current) {
        // console.log(props.isKeyboardVisible)
        const offset = parseInt(Dimensions.get('window').height + props.isKeyboardVisible[1] + countMessages * 2000)
        flatListRef.current.scrollToOffset({ animated: false, offset: offset })
        // flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
        // props.isKeyboardVisible ? flatListRef.current.scrollToEnd({ animated: false }) : flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
      }
    }
  }, [chatDataWithLabels, countMessages]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <View style={styles.mainContainer}>
        <View style={styles.leftView}>
          <View style={styles.topView}>
            <View style={styles.avatarView}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' }} style={styles.avatar} />
              <View style={{ height: "80%", marginTop: "auto", marginBottom: "auto" }}>
                <Text style={[styles.user, { height: "50%", top: 2 }]}>Manas Agrawal</Text>
                <Text style={[styles.user, { color: 'black', fontFamily: 'CrimsonText-Regular', fontSize: 19, bottom: 3 }]}>Area: Indore</Text>
              </View>
            </View>
            <FontAwesome6 name="edit" size={25} style={styles.icon} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="gray"
              value={searchText}
              onChangeText={(val) => setSearchText(val)}
            />
            <EvilIcons name="search" size={24} color="gray" style={styles.iconSearch} />
          </View>
          <View style={styles.channelContainer}>
            {topPadding && data ? <FlatList data={data} contentContainerStyle={{ justifyContent: 'space-evenly', paddingTop: topPadding - 30, paddingBottom: 0 }} style={{ flexGrow: 1 }} renderItem={({ item }) => (
              <ChannelList name={item.name} data={item.data} senderId={"1"} index={item.id} setChatData={setChatData} setUser={setUser}/>
            )}
            /> : undefined}
          </View>
        </View>
        {(props.isKeyboardVisible[0] && props.isKeyboardVisible[1] !== 0) || (!props.isKeyboardVisible[0] && props.isKeyboardVisible[1] === 0) ? <View style={styles.rightView}>
          {user && chatDataWithLabels ? <View style={styles.topView1}>
            <UserTitle name={user.name} />
          </View> : undefined}
          {chatDataWithLabels ? <View style={styles.bottomContainer}>
            <View style={[styles.bottomContainer1, { height: Dimensions.get('window').height - (90 + 80 + 70 + props.isKeyboardVisible[1]) }]}>
              {data && chatDataWithLabels ? <FlatList ref={flatListRef} data={props.isKeyboardVisible ? chatDataWithLabels : chatDataWithLabels.reverse()} inverted={props.isKeyboardVisible ? false : true} contentContainerStyle={{ justifyContent: 'space-evenly' }} style={{ flexGrow: 1 }} renderItem={({ item }) => (
                <View>
                  <View style={styles.dateSeparator}>
                    <Text style={styles.dateSeparatorText}>{item.dateLabel}</Text>
                  </View>
                  <FlatList data={props.isKeyboardVisible ? item.messages : item.messages.reverse()} inverted={props.isKeyboardVisible ? false : true} contentContainerStyle={{ justifyContent: 'space-evenly', paddingBottom: 0 }} style={{ flexGrow: 1 }} renderItem={({ item: message }) => (
                    <MessageBox senderId={message.id} userId={"1"} data={message.data} time={message.time} keyItem={message.key} />
                  )} />
                </View>
              )}
                onContentSizeChange={() => {
                  const offset = parseInt(Dimensions.get('window').height + props.isKeyboardVisible[1] + countMessages * 2000)
                  flatListRef.current.scrollToOffset({ animated: false, offset: offset })
                }}
                onLayout={() => {
                  const offset = parseInt(Dimensions.get('window').height + props.isKeyboardVisible[1] + countMessages * 2000)
                  flatListRef.current.scrollToOffset({ animated: false, offset: offset })
                }}
              // onContentSizeChange={() => props.isKeyboardVisible ? flatListRef.current.scrollToEnd({ animated: false }) : flatListRef.current.scrollToOffset({ animated: false, offset: 0 })}
              // onLayout={() => props.isKeyboardVisible ? flatListRef.current.scrollToEnd({ animated: false }) : flatListRef.current.scrollToOffset({ animated: false, offset: 0 })}
              /> : undefined}
            </View>
            <View style={[styles.bottomContainer2, { marginBottom: props.isKeyboardVisible[1] }]}>
              <InputBox countMessages={countMessages} setCountMessages={setCountMessages} isKeyboardVisible={props.isKeyboardVisible} setChatData={setChatData} chatData={chatData} flatListRef={flatListRef} />
            </View>
          </View> : undefined}
        </View> : undefined}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    // height: Dimensions.get('window').height - 90,
    width: "100%",
    flexDirection: "row",
    backgroundColor: '#f5f6f9',
    flex: 1,
  },
  leftView: {
    // backgroundColor: "green",
    width: "27%",
    height: '100%',
    borderRightWidth: 2,
    borderRightColor: "lightgray",
  },
  topView: {
    width: "100%",
    height: '11%',
    flexDirection: 'row',
    // backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  avatarView: {
    // backgroundColor: 'blue',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
  },
  user: {
    fontSize: 22,
    height: '52%',
    color: 'blue',
    fontFamily: 'SignikaNegative-Bold',
    // fontWeight: '600',
    // backgroundColor: "white",
  },
  icon: {
    // backgroundColor: "green",
    height: '50%',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  channelContainer: {
    // backgroundColor: "green",
    width: "100%",
    flex: 1,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: "80%",
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#f5f6f9',
  },
  iconSearch: {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: [{ translateY: -12 }],
    // backgroundColor: 'green',
  },
  input: {
    color: 'black',
    fontSize: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: 'white',
    paddingLeft: 45,
    paddingVertical: 10,
    // backgroundColor: "red",
    width: "100%"
  },
  rightView: {
    backgroundColor: "white",
    width: "73%"
  },
  topView1: {
    height: 80,
    borderBottomWidth: 3,
    borderBottomColor: "#e1e4e6",
    width: "100%",
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: "row",
    elevation: 5,
    // backgroundColor: "#f2f4f6",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10
  },
  bottomContainer: {
    height: Dimensions.get('window').height - (90 + 80),
    // backgroundColor: "red",
  },
  bottomContainer1: {
    // height: Dimensions.get('window').height - (90+80+130),
    borderBottomWidth: 2,
    borderBottomColor: "#e1e4e6",
    width: "93%",
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: "row",
    // paddingBottom: 100,
    // marginBottom: 100
    // backgroundColor: "red",
  },
  dateSeparator: {
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#e1e4e6",
    justifyContent: "center",
    alignItems: 'center'
  },
  dateSeparatorText: {
    fontWeight: 'bold',
    height: 25,
    // width: 100,
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    alignItems: 'center',
    top: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  // bottomContainer2Scroll: {
  //   height: "15%",
  //   // backgroundColor: "green",
  //   marginTop: 15
  // },
  bottomContainer2: {
    height: 70,
    // paddingBottom: 10
    // backgroundColor: "red"
  }

})
