import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, ScrollView, Platform, PermissionsAndroid } from "react-native";
// import NavbarFW2 from "../../components/NavbarFW2";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorder2 from "./AudioRecord2";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import MyTextInput from "./TextInput";

const PatientPrescr = (props) => {
    const [aabha, setaabha] = useState('');

    const onChangeText = (inputText) => {
      setaabha(inputText);
    };

    //console.log("Hellloo", props.currTask)
    // useEffect(() => {

    //     const fetchtask = async () => {
    //         const key = "Bearer " + props.jwtToken;
    //         const patientId = await AsyncStorage.getItem('patientId');

    //        const URL = props.URL + '/fw/checkFollowUp'

    //        const params = new URLSearchParams({
    //         id: parseInt(patientId),
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

    //         }catch(err){
    //             console.error("Error fetching data:", error);
    //         }
    //     }

    //     fetchtask();
    // }, [props.jwtToken]);

    const doneTask = async () => {
        // call complete task

        const url = props.URL + '/fw/completeTask'
        const key = "Bearer " + props.jwtToken
        try {
            props.setLoad(true);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: key,
                },
                body: JSON.stringify({
                    id: parseInt(props.currTask.id),
                    timestamp: new Date().toISOString(),
                    aabha: aabha
                }),
            }).then(res=> res.json())


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

    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Text
                style={{
                    marginBottom: 20,
                    marginTop: 40,
                    fontSize: 36,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#686868",
                }}
            >
                Current Prescription for: {props.currTask.name}
            </Text>

            <ScrollView style={styles.container}>
                <View>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        textAlign: "start",
                        color: "#686868",
                    }}>Medicine</Text>
                    {/* medicine text */}
                    <View style={styles.prescontainer}>
                        <Text style={{
                            fontSize: 19,
                            fontWeight: 500,
                            color: "#c2833",
                        }}>{props.currTask.medicine} for {props.currTask.days}

                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                       
                        color: "#686868",
                        marginTop: 20
                    }}>Tests</Text>
                    {/* medicine text */}
                    <View style={styles.prescontainer}>
                        <Text style={{
                            fontSize: 19,
                            fontWeight: 500,
                           
                            color: "#c2833",
                        }}>{props.currTask.test}

                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                   
                        color: "#686868",
                        marginTop: 20,
                        marginBottom: 20
                    }}>Precautions</Text>
                    {/* medicine text */}
                    <View style={styles.prescontainer}>
                        <Text style={{
                            fontSize: 19,
                            fontWeight: 500,
                            textAlign: "start",
                            color: "#c2833",
                        }}>{props.currTask.precaution}

                        </Text>
                    </View>
                </View>



            </ScrollView>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
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
        height: "50%",
        alignSelf: "stretch", // Equivalent to h-fit (height fit)
        width: "50%",
        marginTop: "10%",
        backgroundColor: "#f5f6f9",
        position: "absolute",
        zIndex: -1,
        alignSelf: "stretch", // Equivalent to h-fit (height fit)
        alignSelf: "flex-start",
        alignSelf: "center", // Equivalent to w-fit (width fit)
        backgroundColor: "white",
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
    prescontainer: {
        backgroundColor: '#f0f3f4',
        alignSelf: 'flex-start',
        padding: 20,
        borderRadius: 24,
        marginTop: 5,
        marginBottom: 20,
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

export default PatientPrescr;