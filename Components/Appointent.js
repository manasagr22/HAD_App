import React, { useEffect, useMemo, useState } from 'react'
import { Button, Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Appointment = (props) => {

    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentDuration, setappointmentDuration] = useState("")
    const [taskId, setTaskId] = useState(null);
    const [task, setTask] = useState(null);

    useEffect(() => {
        // do this to get task_id

        // by checkfollowup

        //         const key = "Bearer " + props.jwtToken;
        //         const patientId = await AsyncStorage.getItem('patientId');

        //        const URL = props.URL + '/fw/checkFollowUp'

        //        const params = new URLSearchParams({
        //         id: patientId,
        //     }).toString();

        //     const url = `${URL}?${params}`;

        //         try{
        //             const result = await fetch(url, {
        //                 method: "GET",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: key,
        //                 },
        //             }).then((res) => res.json());

        //             setTaskId(result.task_id);
        //         }catch(err){
        //             console.error("Error fetching data:", error);
        //         }
        //     }

        //     fetchtask();

    }, []);

    return (
        <View>
            {task !== null ? <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Text
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    marginTop: 40,
                    fontSize: 36,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#686868",
                }}
            >
                Latest Appointment:
            </Text>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.title}>Date:  </Text>
                        <Text style={styles.description}>8 Jan 2024</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.title}>Time:  </Text>
                        <Text style={styles.description}>8:15 pm</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.title}>Duruation:  </Text>
                        <Text style={styles.description}>1 hr 30 mins</Text>
                    </View>
                </View>
            </View>
            
                </View> :  <Text
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    marginTop: 40,
                    fontSize: 36,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#686868",
                }}
            >
                No Appointments Scheduled Yet!
            </Text>}
        </View>
        
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "50%",
        width: "50%",
        justifyContent: 'space-between',
        marginTop: "10%",
        backgroundColor: "#F0FFFF",
        position: "absolute",
        zIndex: -1,
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
        padding: 20

    },
    cardContainer: {
        flex: 0.25,
        alignItems: 'center',
        backgroundColor: '#f4ecf7',
        borderRadius: 10,
        margin: 5,
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
})

export default Appointment;