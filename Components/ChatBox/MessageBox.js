import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function MessageBox(props) {
    const isSender = props.senderId !== props.userId;
    const [sent, setSent] = useState('delivered')

    function extractHourMinuteAMPM(time) {
        var timeDigits = time.split(":");

        var hours = timeDigits[0];
        var minutes = timeDigits[1];
        var ampm = timeDigits[2].includes("AM") ? "AM" : "PM";

        var extractedTime = hours + ':' + minutes + ' ' + ampm;
        
        return extractedTime;
    }

    return (
        <View key={props.keyItem} style={[styles.messageContainer, isSender ? styles.senderMessage : styles.receiverMessage]}>
            <Text style={[styles.messageText, isSender ? { color: "white" } : { color: "black" }]}>{props.data}</Text>
            <View style={styles.messageFooter}>
                <Text style={[styles.timeText, isSender ? {color: "white"} : {}]}>{extractHourMinuteAMPM(props.time)}</Text>
                <View style={styles.messageStatusContainer}>
                    {isSender && (
                        <>
                            {sent === 'sent' && <Feather name="check" size={20} color="white" />}
                            {sent === 'delivered' && <View style={{ position: "relative", marginLeft: 30}}>
                                <Ionicons name="checkmark-done" size={20} color="white" />
                            </View>}
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        maxWidth: '40%',
        borderRadius: 10,
    },
    senderMessage: {
        alignSelf: 'flex-end',
        // backgroundColor: '#DCF8C6',
        backgroundColor: "blue"
    },
    receiverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: "#f2f4f6",
    },
    messageText: {
        fontSize: 16,
    },
    messageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    timeText: {
        color: 'gray',
        fontSize: 12,
    },
    messageStatusContainer: {
        marginLeft: 5,
    },
})