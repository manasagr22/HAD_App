import React, { useEffect, useMemo, useState } from 'react'
import { Button, Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';



const DoctorQn = (props) => {


    const [aabha, setaabha] = useState("");

    const onChangeText = (inputText) => {
        setaabha(inputText);
    };

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
                    answer: answer,
                    aabha: aabha
                }),
            }).then(res=> res.json());


            //console.log(response.data);
          
                props.setAlert({ type: "success", msg: "Task Done Successfully" })
                props.navigate("Dashboard")
            

            // navigate to dashboard

            setTimeout(() => {
                props.setAlert(null);
            }, 1800);

        } catch (err) {
            //console.log("Error Posting: ", err)
        }

        props.setLoad(false);
    }

    const [answer, setanswer] = useState("");

    const onChangeAns = (inputText) => {
        setanswer(inputText);
    };

    return (<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
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
            Current Questionnaire for: {props.currTask.name}
        </Text>

        <View style={styles.container}>
            <View>
                <Text style={{
                    marginBottom: 20,
                    marginTop: 20,
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "start",
                    color: "#686868"
                }}>
                    Q.) {props.currTask.question}
                </Text>

                {/* input */}

                <View style={styles.inpcontainer}>
                    <TextInput
                        style={styles.textInput}
                        textAlignVertical="top" 
                        value={answer}
                        onChangeText={onChangeAns}
                        placeholder="Enter text here"
                    />
                </View>

            </View>
        </View>
            
        <View style={styles.subcontainer}>
      <View style={styles.subinputContainer}>
        <TextInput
          style={styles.subinput}
          onChangeText={onChangeAns}
          value={answer}
          placeholder="Enter Aabha ID..."
        />
      </View>
      <TouchableOpacity style={[styles.navButton, styles.submitButton]} onPress={doneTask}>
        <Text style={[styles.navButtonText, styles.submitButtonText]}>Done Task</Text>
      </TouchableOpacity>
    </View>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "40%",
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

    inpcontainer: {
        height: '70%',
        marginTop: 20,
      },
      textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
        height: '90%', // Make TextInput occupy 100% of its parent's width
      },

    

    subcontainer: {
        marginTop: '30%',
        flexDirection: 'row', // Arrange children horizontally
        alignItems: 'center', // Align children vertically at the center
      },
      inputContainer: {
        flex: 1, // Take remaining space
        marginRight: 10, // Add some space between input and button
      },
      subinput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
      },
      navButton: {
        marginLeft: 70,
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      submitButton: {
        backgroundColor: 'green',
      },
      navButtonText: {
        color: 'white',
        fontSize: 16,
      },
      submitButtonText: {
        fontWeight: 'bold',
      },
})

export default DoctorQn;