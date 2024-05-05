import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



export default function InputBox(props) {
    const [searchText, setSearchText] = useState("");
    const smileys = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃'];

    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (searchText === "") {
            // if(props.flatListRef.current) {
            //     const offset = Dimensions.get('window').height
            //     props.flatListRef.current.scrollToOffset({ animated: false, offset: 768 })
            // }
        }
    }, [searchText])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const renderSmiley = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSmileySelect(item)}>
                <Text style={styles.smiley}>{item}</Text>
            </TouchableOpacity>
        );
    };

    const handleSmileySelect = (smiley) => {
        setSearchText(searchText + smiley)
    };

    const convertFormat = (date) => {
        const str = (date.split(","))[0].split("/")
        var dd = str[1], mm = str[0];
        dd = dd.length === 1 ? '0' + dd : dd;
        mm = mm.length === 1 ? '0' + mm : mm;
        return `${dd}/${mm}/${str[2]}`
    }

    const sendMessage = () => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        };

        const options1 = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        }
        const date = convertFormat(new Date().toLocaleTimeString('en-US', options));
        const time = new Date().toLocaleTimeString('en-US', options1);

        var key = 0;

        for (const d in props.chatData) {
            key += props.chatData[d].length
        }
        const newMessage = {
            key: String(key + 1),
            id: props.senderId,
            data: searchText,
            time: time
        }

        if (props.client && props.client.connected) {
            try {
                if (props.chatData[date]) {
                    // If the date exists, push the newMessage object into the array
                    props.setChatData(prevChatData => ({
                        ...prevChatData,
                        [date]: [...prevChatData[date], newMessage]
                    }));
                } else {
                    // If the date doesn't exist, create a new key-value pair with the new date and initialize it with an array containing the newMessage object
                    props.setChatData(prevChatData => ({
                        ...prevChatData,
                        [date]: [newMessage]
                    }));
                }
            }
            catch {
                props.setChatData(prevChatData => ({
                    ...prevChatData,
                    [date]: [newMessage]
                }));
            }

            //console.log("Receiver Email: ", props.email);

            props.sendMessageSocket(searchText, props.email, date, time, props.senderName, props.name)
            setSearchText("");
        }
        // props.setCountMessages(props.countMessages + 1);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input]}
                    placeholder="Type here..."
                    placeholderTextColor="gray"
                    value={searchText}
                    onChangeText={(val) => setSearchText(val)}
                />
                <TouchableOpacity style={[styles.iconSearch, { left: 10 }]}>
                    <Feather name="mic" size={24} color="red" />
                </TouchableOpacity>
                <View style={[{ flexDirection: "row", right: 10, width: "15%", justifyContent: "space-evenly" }, styles.iconSearch]}>
                    <TouchableOpacity>
                        <Entypo name="attachment" size={24} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal}>
                        <Fontisto name="smiley" size={24} color="gray" />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={toggleModal}
                    >
                        <TouchableOpacity
                            style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setModalVisible(false)
                            }} activeOpacity={1}></TouchableOpacity>
                        <View style={styles.modalContainer}>
                            <FlatList
                                data={smileys}
                                renderItem={renderSmiley}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={6}
                            />
                        </View>
                    </Modal>
                    <TouchableOpacity style={{ bottom: 5 }} onPress={sendMessage}>
                        <MaterialIcons name="send" size={33} color="blue" />
                    </TouchableOpacity>
                </View>
                {/* <EvilIcons name="search" size={24} color="gray" style={styles.iconSearch} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        // backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        // paddingBottom: 100
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#f2f4f6',
        width: "85%",
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f5f6f9',
    },
    iconSearch: {
        position: 'absolute',
        top: '50%',
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
        width: "100%",
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        marginHorizontal: 20,
        // marginTop: 50,
        width: "20%",
        position: "absolute",
        // top: 7,
        paddingLeft: 20,
        paddingBottom: 15,
        right: -10,
        bottom: 55,
        height: "50%"
    },
    smiley: {
        fontSize: 20,
        margin: 5,
    },
})
