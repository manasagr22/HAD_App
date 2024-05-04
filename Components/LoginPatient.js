import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginPatient(props) {
    const [focus, setFocus] = useState(null);
    const [aabha, setAabha] = useState("");
    const [pass, setPass] = useState("");

    const loginHandler = async () => {
        const key = "Bearer " + props.jwtToken;
        try {
            const url = props.URL + '/fw/patientLogIn'
            props.setLoad(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key
                },
                body: aabha,
            }).then(res => res.json());

            props.setLoad(false);
            console.log(response);

            if (response !== null) {
                props.setAlert({ type: "success", msg: "Login Successful!" });

                props.navigate("LoggedIn Patient");

            }
            else {
                props.setAlert({ type: "error", msg: "Invalid Credentials", })
            }

        } catch (err) {
            console.log(err);
            props.setLoad(false);
            props.setAlert({ type: "error", msg: "Some error occurred", })
        }



        setTimeout(() => {
            props.setAlert(null);
        }, 1800)
        // navigate('/fw/loggedInPatient', {replace: true});
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <LinearGradient colors={['#60A5FA', '#3B82F6']} style={styles.gradientBackground} />
                <View style={styles.innerContainer}>
                    <Text style={styles.heading}>Enter Patient Details</Text>
                    <View style={styles.inputGroup}>
                        {aabha !== "" || focus === 0 ? <Text style={[styles.labelFocused, focus !== 0 && { color: "#D1D5DB" }]}>AABHA ID</Text> : undefined}
                        <TextInput
                            style={[styles.input, focus === 0 && styles.inputFocused]}
                            keyboardType="numeric"
                            value={aabha}
                            onChangeText={(val) => setAabha(val)}
                            placeholder={focus === 0 ? '' : 'AABHA ID'}
                            onFocus={() => setFocus(0)}
                            onBlur={() => {
                                focus === 0 ? setFocus(null) : undefined
                            }}
                        />
                    </View>
                    {/* <View style={styles.inputGroup}>
                        {pass !== "" || focus === 1 ? <Text style={[styles.labelFocused, focus !== 1 && { color: "#D1D5DB" }]}>Password</Text> : undefined}
                        <TextInput
                            style={[styles.input, focus === 1 && styles.inputFocused]}
                            secureTextEntry={true}
                            value={pass}
                            onChangeText={(val) => setPass(val)}
                            placeholder={focus === 1 ? '' : 'Password'}
                            onFocus={() => setFocus(1)}
                            onBlur={() => {
                                focus === 1 ? setFocus(null) : undefined
                            }}
                        />
                    </View> */}
                    <TouchableOpacity style={styles.button} onPress={loginHandler}>
                        <Text style={styles.buttonText}>Login Patient</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: Dimensions.get('window').height - 65,
        // backgroundColor: '#E5E7EB'
        backgroundColor: '#f5f6f9'
    },
    container: {
        //   backgroundColor: '#E5E7EB', // Gray-100
        //   paddingTop: 120,
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        height: "40%",
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        //   backgroundColor: 'green'
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        transform: [{ skewY: '-6deg' }],
        borderRadius: 20,
        width: '56%',
        left: "21.8%",

    },
    innerContainer: {
        position: 'relative',
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: '#FFFFFF', // White
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        width: '56%',
        height: '98%',
    },
    labelFocused: {
        position: 'absolute',
        top: -9,
        fontSize: 12,
        color: 'blue', // Change color as needed
        left: 13,
        // top: 12,
        backgroundColor: "white",
        paddingHorizontal: 7,
        zIndex: 1
    },
    inputFocused: {
        borderColor: 'blue', // Change border color when focused
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: "black"
    },
    inputGroup: {
        marginBottom: 20,
    },
    // label: {
    //   fontSize: 16,
    //   fontWeight: 'bold',
    //   marginBottom: 5,
    //   color: '#000000', // Black
    // },
    input: {
        //   backgroundColor: '#F3F4F6', // Gray-50
        borderWidth: 1,
        borderColor: '#D1D5DB', // Gray-300
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3B82F6', // Blue-500
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: "50%",
        marginLeft: 'auto',
        marginRight: "auto",
        marginTop: 20
    },
    buttonText: {
        color: '#FFFFFF', // White
        fontSize: 16,
        fontWeight: 'bold',
    },
});
