import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import ChannelList from './ChannelList';
import Data from './dummy.json';
import ChatData from './ChatData.json';
import UserTitle from './UserTitle';
import InputBox from './InputBox';
import MessageBox from './MessageBox';

export default function Chat(props) {
  const [data, setData] = useState(null);
  const [chatData, setChatData] = useState(ChatData);
  const [topPadding, setTopPadding] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    // console.log(props.isKeyboardVisible);
    ;
}, [props.isKeyboardVisible])

  const options = {
    hour: '2-digit',
    minute: '2-digit',
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
    // Scroll to the end of the list when data changes
    if(flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [data]);

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
            {topPadding && data ? <FlatList data={data} contentContainerStyle={{ justifyContent: 'space-evenly', paddingTop: topPadding, paddingBottom: 70 }} style={{ flexGrow: 1 }} renderItem={({ item }) => (
              <ChannelList name={item.name} data={item.data} index={item.index} time={indianTime} />
            )}
            /> : undefined}
          </View>
        </View>
        {(props.isKeyboardVisible[0] && props.isKeyboardVisible[1] !== 0) || (!props.isKeyboardVisible[0] && props.isKeyboardVisible[1] === 0) ?  <View style={styles.rightView}>
          <View style={styles.topView1}>
            <UserTitle name={Data[3].name} data={Data[3].data} />
          </View>
          <View style={styles.bottomContainer}>
            <View style={[styles.bottomContainer1, {height: Dimensions.get('window').height - (90+80+70+props.isKeyboardVisible[1])}]}>
            {topPadding && data ? <FlatList ref={flatListRef} data={chatData} contentContainerStyle={{ justifyContent: 'space-evenly', paddingTop: topPadding - 40, paddingBottom: 0 }} style={{ flexGrow: 1 }} renderItem={({ item }) => (
              <MessageBox senderId={item.id} userId={"1"} data={item.data} date={item.date} time={item.time} key={item.key} />
            )}
            onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
      onLayout={() => flatListRef.current.scrollToEnd({ animated: false })}
            /> : undefined}
            </View>
              <View style={[styles.bottomContainer2, {marginBottom: props.isKeyboardVisible[1]}]}>
                <InputBox isKeyboardVisible={props.isKeyboardVisible} />
              </View>
          </View>
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
    backgroundColor: "#f2f4f6",
  },
  bottomContainer: {
    height: Dimensions.get('window').height - (90+80),
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
