import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function UserTitle(props) {
    return (
        <View style={styles.title}>
            <View style={styles.avatarView}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' }} style={styles.avatar} />
                {/* <View style={{ height: "80%", marginTop: "auto", marginBottom: "auto" }}> */}
                <Text style={[styles.user]}>{props.name}</Text>
                {/* <Text style={[styles.user, { color: 'black', fontFamily: 'CrimsonText-Regular', fontSize: 19, bottom: 3 }]}>Area: Indore</Text> */}
                {/* </View> */}
            </View>
            <View style={styles.iconContainer}>
                <AntDesign name="mail" size={24} color="gray" />
                <SimpleLineIcons name="pin" size={24} color="gray" />
                <Ionicons name="notifications-outline" size={24} color="gray" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        // backgroundColor: "green",
        flexDirection: "row",
        width: "100%",
        alignItems: 'center'
    },
    avatarView: {
        // backgroundColor: 'blue',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        left: 20,
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
        fontSize: 24,
        height: '50%',
        color: 'black',
        fontFamily: 'SignikaNegative-Medium',
        // fontWeight: '600',
        // backgroundColor: "white",
    },
    iconContainer: {
        flexDirection: "row",
        // backgroundColor: "red",
        height: "37%",
        width: "11%",
        justifyContent: 'space-evenly',
        alignItems: "center",
        position: 'absolute',
        right: 20,

    }

})
