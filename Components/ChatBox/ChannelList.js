import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function ChannelList(props) {
    const [str, setStr] = useState(props.data)
    return (
        <View style={styles.topView} key={props.index}>
            <TouchableOpacity onPress={() => console.log("hello")}>
                <View style={styles.avatarView}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' }} style={styles.avatar} />
                    <View style={{ flexDirection: 'column', height: "86%", justifyContent: 'center', alignItems: 'flex-start', width: "80%" }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: "80%" }}>
                            <Text style={[styles.user, str === null && { bottom: 4.3 }]}>{props.name}</Text>
                            {str ? <Text style={[styles.time, str === null && { bottom: 4.3 }]}>{props.time}</Text> : undefined}
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: "75%" }}>
                            {str !== null ? <Text numberOfLines={2} style={[styles.user, { color: 'gray', bottom: 6, fontFamily: 'CrimsonText-Regular', fontSize: 17, flexWrap: 'wrap', width: "95%" }]}>{str}</Text> : undefined}
                            {str ? <View style={{ position: "relative", marginLeft: 30, bottom: 7 }}>
                                <Ionicons name="checkmark-done" size={20} color="gray" />
                            </View> : undefined}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        width: "90%",
        height: 75,
        // backgroundColor: "gray",
        flexDirection: 'row',
        // backgroundColor: 'white',
        justifyContent: 'flex-start',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 6,
        // backgroundColor: 'green'
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
        fontSize: 20,
        // height: '100%',
        color: 'blue',
        fontFamily: 'SignikaNegative-SemiBold',
        // fontWeight: '600',
        // backgroundColor: "white",
        width: "100%"
    },
    time: {
        fontSize: 15,
        fontFamily: 'CrimsonText-Regular',
        color: 'gray',
    }
})
