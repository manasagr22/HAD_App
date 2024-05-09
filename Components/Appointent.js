import React, { useEffect, useMemo, useState } from 'react'
import { Button, Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const Appointment = (props) => {

    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentDuration, setappointmentDuration] = useState("")
    const currentTask = props.currTask;

    //console.log("CURRRENT ", props.currTask);

    //console.log(props.currTask['appointment'])
    const deadlineDateString = props.currTask['deadline'];

    //console.log(deadlineDateString)
    //console.log(props.currTask.name)


    // Parse the date string using moment
    const deadlineDate = moment(deadlineDateString, 'YYYY-MM-DD');


    // Format the date as "D MMM YYYY"
    const formattedDate = deadlineDate.format('D MMM YYYY');
    //console.log(formattedDate);

    const timeString = props.currTask['time'];
    const deadlineTime = moment(timeString, 'HH:mm');
    const formattedTime = deadlineTime.format('h:mm a');
    //console.log(formattedTime)

    // Format the combined date and time
    //   const formattedDateTime = combinedDateTime.format('D MMM YYYY, h:mm a');

    const doneTask = async () => {
        // call complete task

        const url = props.URL + '/fw/completeTask'
        const key = "Bearer " + props.jwtToken
        try {
            props.setLoad(true)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: key,
                },
                body: JSON.stringify({
                    id: parseInt(props.currTask['id']),
                    timestamp: new Date().toISOString(),
                    aabha: aabha
                }),
            }).then(res=>res.json())


            if(response === true){
                props.setAlert({ type: "success", msg: "Task Done Successfully" })
                props.navigate("Dashboard")
            }

            // navigate to dashboard

            setTimeout(() => {
                props.setAlert(null);
            }, 1800);

        } catch (err) {
            //console.log("Error Posting: ", err)
        }

        props.setLoad(false);
    }

    const [aabha, setaabha] = useState("");

    const onChangeText = (inputText) => {
        setaabha(inputText);
    };


    return (

        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Text
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    marginTop: 40,
                    fontSize: 36,
                    fontWeight: "bold",
                    color: "#686868",
                    position: 'absolute'
                }}
            >
                Current Prescription for: {props.currTask['name']}
            </Text>

            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>Date:  </Text>
                        <Text style={styles.description}>{formattedDate}</Text>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>Time:  </Text>
                        <Text style={styles.description}>{formattedTime}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={aabha}
                    placeholder="Enter Aabha ID..."
                />
                <TouchableOpacity style={[styles.navButton, styles.submitButton]} onPress={doneTask}>
                    <Text style={[styles.navButtonText, styles.submitButtonText]}>Done Task</Text>
                </TouchableOpacity>
            </View>

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "50%",
        justifyContent: 'space-between',
        marginTop: "10%",
        backgroundColor: "#F0FFFF",
        position: "absolute",
        zIndex: 1,
        alignSelf: "stretch", // Equivalent to h-fit (height fit)
        alignSelf: "flex-start",
        alignSelf: "center", // Equivalent to w-fit (width fit)
        borderColor: "#CCCCCC",
        borderRadius: 10,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,

    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4ecf7',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 34,
        color: '#666666',
    },
    navButton: {
        height: '7%',
        width: '10%',
        backgroundColor: '#007AFF',
        marginLeft: 40,
        borderRadius: 8,
        marginTop: '36%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: 'green', // Green color
    },
    submitButtonText: {
        fontWeight: 'bold',
    },
    input: {
        width: '15%',
        marginTop: '36%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
})

export default Appointment;