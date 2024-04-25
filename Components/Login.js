import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

export default function Login(props) {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);

    async function signIn() {
        const url = "http://localhost:8082/auth/login"

        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        // try {
        //     const result = await fetch(url, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             password: pass
        //         }),
        //     }).then((res) => res.json());

        //     props.setBackground("");
        //     props.setLoad(false);
        //     if (result.role === "FIELDWORKER") {
        //         // props.handleAlert("success", "Login Successful!!!");
        //         props.setJwtToken(result.jwtToken);
        //     }
        //     else {
        //         console.warn("Invalid Login!");
        //         // props.handleAlert("danger", "Invalid Login!");
        //     }
        // } catch {
        //     ;
        // }

    }
    return (
        <View style={styles.mainContainer}>
            <View style={{ width: '30%', height: '45%', margin: "auto" }}>
                <View style={styles.imgContainer}>
                    <Image source={require('../Images/Logo.png')} style={{ width: 85, height: 70 }} />
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.container}>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="white"
                                keyboardType="email-address"
                                onChangeText={(text) => setEmail(text)}
                            />
                            <Fontisto name="email" size={24} color="#d7da43" style={styles.icon} />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="white"
                                secureTextEntry={true}
                                onChangeText={(text) => setPass(text)}
                            />
                            <AntDesign name="lock1" size={24} color="#d7da43" style={styles.icon} />
                        </View>

                        {/* Sign In button */}
                        <TouchableOpacity style={styles.signInButton} onPress={() => props.navigate("Register")}>
                            <Text style={styles.signInText}>Sign In</Text>
                        </TouchableOpacity>

                        {/* Forgot Password link */}
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imgContainer: {
        flex: 0.1,
        // backgroundColor: 'green',
        width: '23%',
        marginLeft: "auto",
        marginRight: "auto",
    },
    loginContainer: {
        flex: 0.9,
        flexDirection: 'column',
        width: '100%',
        height: '20%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        // backgroundColor: "red"
    },
    container: {
        flex: 1,
        // backgroundColor: 'black',
        padding: 20,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: 10,
        transform: [{ translateY: -12 }],
    },
    input: {
        color: 'white',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingLeft: 45,
        paddingVertical: 10,
    },
    signInButton: {
        // backgroundColor: '#2196F3',
        backgroundColor: "#d7da43",
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    signInText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },
    forgotPassword: {
        marginTop: 10,
        alignItems: 'center',
    },
    forgotPasswordText: {
        color: 'blue',
        fontSize: 15,
    },
})