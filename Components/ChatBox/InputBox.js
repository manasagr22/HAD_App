import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function InputBox(props) {
    const [searchText, setSearchText] = useState("");
    const smileys = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃'];

    const [isModalVisible, setModalVisible] = useState(false);

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
        // Handle the selected smiley
        // console.log('Selected smiley:', smiley);
        setSearchText(searchText+smiley)
    };

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
                    <TouchableOpacity style={{ bottom: 5 }}>
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
