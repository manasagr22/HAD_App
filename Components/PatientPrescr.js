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

const PatientPrescr = () => {
    return (
        <View style={{ flex: 1, alignSelf: 'flex-center'}}>
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
                Current Prescription
            </Text>

            <View style={styles.container}><View>
                <Text style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "start",
                    color: "#686868",
                }}>Medicine</Text>

                {/* medicine text */}

                <View style={styles.prescontainer}>
                    <Text style={{
                    fontSize: 12,
                    fontWeight: 500,
                    textAlign: "start",
                    color: "#c2833",
                }}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                
                 </Text>
                </View>
            </View></View>




        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "45%",
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
        paddingBottom: 10,
        padding: 20,
    },
    prescontainer: {
        backgroundColor: '#f0f3f4',
        alignSelf: 'flex-start',
        padding: 20,
        borderRadius: 24,
        marginTop: 10,

    }
})

export default PatientPrescr;