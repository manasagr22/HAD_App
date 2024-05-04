import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ChatData from './ChatData.json';

export default function ChannelList(props) {
    const [str, setStr] = useState(props.data.length === 0 ? null : props.data.msg)

    useEffect(() => {
        setStr(props.data.msg)
    }, [props.data.msg])

        function getCorrectDate(date) {
          const parts = date.split("/");
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    
        function getLabel(date) {
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
    
            const messageDate = new Date(getCorrectDate(date));
    
            let dateLabel;
            if (messageDate.toDateString() === today.toDateString()) {
              dateLabel = "Today";
            } else if (messageDate.toDateString() === yesterday.toDateString()) {
              dateLabel = "Yesterday";
            } else {
              dateLabel = date;
            }
    
          return dateLabel;
        }

    function extractHourMinuteAMPM(time) {
        var timeDigits = time.split(":");

        var hours = timeDigits[0];
        var minutes = timeDigits[1];
        var ampm = timeDigits[2].includes("AM") ? "AM" : "PM";

        var extractedTime = hours + ':' + minutes + ' ' + ampm;
        
        return extractedTime;
    }

    async function openChat() {
        console.log(props.index)
        const url = new URL(props.URL)
        url.pathname = "/supervisor/getChats";
        url.searchParams.set("id", props.index);
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.jwtToken
            }
        }).then(res => res.json());
        props.setChatData(result);
        props.setUser({ id: props.index, name: props.name, data: props.data })
    }

    return (
        <View style={styles.topView} key={props.index}>
            <TouchableOpacity onPress={openChat}>
                <View style={styles.avatarView}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' }} style={styles.avatar} />
                    <View style={{ flexDirection: 'column', height: "86%", justifyContent: 'center', alignItems: 'flex-start', width: "80%" }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: "80%" }}>
                            <Text style={[styles.user, str === null && { bottom: 4.3 }]}>{props.name}</Text>
                            {str && props.data.length !== 0 ? getLabel(props.data.date) === "Today" ? <Text style={[styles.time, str === null && { bottom: 4.3 }]}>{extractHourMinuteAMPM(props.data.time)}</Text> : <Text style={[styles.time, str === null && { bottom: 4.3 }, getLabel(props.data.date) !== "Yesterday" && {right: 6}]}>{getLabel(props.data.date)}</Text> : undefined}
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
