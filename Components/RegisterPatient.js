import React, { useEffect, useMemo, useState } from 'react'
import { Button, Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegisterPatient(props) {

    const [focus, setFocus] = useState(null);
    const [gender, setGender] = useState("");
    const [dropdown, setDropdown] = useState(false)
    const [fw, setFW] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [isChecked, setIsChecked] = useState(false);

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [aabha, setAabha] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [district, setDistrict] = useState("");
    const [subdiv, setSubDiv] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.font}>Register the Patient</Text>
            <View style={styles.radioContainer}>
                <BouncyCheckbox
                    size={40}
                    fillColor="green"
                    unFillColor="#FFFFFF"
                    disableText
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={(isChecked) => setFW(isChecked)}
                />
                <Text style={{ marginLeft: 10, fontWeight: "500", fontSize: 20, fontFamily: "JosefinSans-Regular", color: "black" }}>Enable Field Worker Assistance</Text>
            </View>
            <View>
            {/* <KeyboardAvoidingView
                style={styles.keyboardAvoidingContainer}
                behavior="padding"
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputContainer1}>
                                {fName !== "" || focus === 0 ? <Text style={[styles.labelFocused, focus !== 0 && {color: "gray"}]}>First Name</Text> : undefined}
                                <TextInput placeholder={focus === 0 ? '' : 'First Name'} value={fName} onChangeText={(val) => setFName(val)} style={[styles.input, focus === 0 && styles.inputFocused]} id='fName' onFocus={() => setFocus(0)} onBlur={() => {
                                    focus === 0 ? setFocus(null) : undefined
                                }} />
                            </View>
                            <View style={styles.inputContainer1}>
                            {lName !== "" || focus === 1 ? <Text style={[styles.labelFocused, focus !== 1 && {color: "gray"}]}>Last Name</Text> : undefined}
                                <TextInput placeholder={focus === 1 ? '' : 'Last Name'} value={lName} onChangeText={(val) => setLName(val)} style={[styles.input, focus === 1 && styles.inputFocused]} id='lName' onFocus={() => setFocus(1)} onBlur={() => {
                                    focus === 1 ? setFocus(null) : undefined
                                }} />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputContainer1}>
                                {dropdown || gender !== "" ? <Text style={[styles.labelFocused, !dropdown && {color: "gray"}]}>Gender</Text> : undefined}
                                <Dropdown
                                    style={[styles.dropdown, dropdown && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!dropdown ? 'Gender' : ''}
                                    searchPlaceholder="Search..."
                                    value={gender}
                                    onFocus={() => {
                                        setDropdown(true)
                                        setFocus(2)
                                    }}
                                    onBlur={() => setDropdown(false)}
                                    onChange={item => {
                                        setGender(item.value);
                                        setDropdown(false);
                                    }}
                                />
                            </View>
                            <View style={styles.inputContainer1}>
                            {aabha !== "" || focus === 3 ? <Text style={[styles.labelFocused, focus !== 0 && {color: "gray"}]}>AABHA ID</Text> : undefined}
                                <TextInput placeholder={focus === 3 ? '' : 'AABHA ID'} value={aabha} onChangeText={(val) => setAabha(val)} style={[styles.input, focus === 3 && styles.inputFocused]} id='aabha' onFocus={() => setFocus(3)} onBlur={() => {
                                    focus === 3 ? setFocus(null) : undefined
                                }} />
                            </View>
                        </View>
                        {!fw ? <View style={styles.inputContainer}>
                            <View style={{ flexDirection: 'row', flex: 0.475, left: 10, position: "relative", height: '65%', top: 12 }}>
                                <View style={[styles.inputContainer1, { flex: 1 }]}>
                                    {mobile !== "" || focus === 4 ? <Text style={[styles.labelFocused, { left: 60, top: -9 }, focus !== 4 && {color: "gray"}]}>Mobile Number</Text> : undefined}
                                    <TextInput
                                        style={[styles.input, { borderLeftWidth: 0, flex: 1, paddingLeft: 65 }, focus === 4 && styles.inputFocused]}
                                        keyboardType="numeric"
                                        maxLength={10}
                                        minLength={10}
                                        placeholder={focus === 4 ? '' : 'Mobile Number'}
                                        value={mobile}
                                        onChangeText={(val) => setMobile(val)}
                                        onFocus={() => setFocus(4)}
                                        onBlur={() => {
                                            focus === 4 ? setFocus(null) : undefined
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        backgroundColor: 'rgba(113, 128, 150, 0.1)',
                                        borderColor: '#cbd5e0',
                                        borderWidth: 1.4,
                                        borderRadius: 7,
                                        borderTopRightRadius: 2,
                                        borderBottomRightRadius: 2,
                                        paddingLeft: 3,
                                        paddingRight: 5,
                                        height: "100%",
                                        width: "25%",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: "row",
                                        borderRightWidth: 0,
                                        // backgroundColor: 'red'
                                    }}
                                >
                                    <Image
                                        source={require('../Images/India.png')}
                                        style={{ width: 29, height: "68%", borderRadius: 15 }}
                                    />
                                    <Text style={{ color: '#667581', fontSize: 12, marginLeft: 5 }}>+91</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.inputContainer1, { left: 5 }]}>
                            {email !== "" || focus === 5 ? <Text style={[styles.labelFocused, focus !== 5 && {color: "gray"}]}>Email Address</Text> : undefined}
                                <TextInput placeholder={focus === 5 ? '' : 'Email Address'} value={email} onChangeText={(val) => setEmail(val)} style={[styles.input, focus === 5 && styles.inputFocused]} id='email' onFocus={() => setFocus(5)} onBlur={() => {
                                    focus === 5 ? setFocus(null) : undefined
                                }} />
                            </View>
                        </View> : undefined}
                        <View style={styles.inputContainer}>
                            <View style={styles.inputContainer1}>
                            {district !== "" || focus === 6 ? <Text style={[styles.labelFocused, focus !== 6 && {color: "gray"}]}>District</Text> : undefined}
                                <TextInput placeholder={focus === 6 ? '' : 'District'} value={district} style={[styles.input, focus === 6 && styles.inputFocused]} id='district' onFocus={() => setFocus(6)} onBlur={() => {
                                    focus === 6 ? setFocus(null) : undefined
                                }} />
                            </View>
                            <View style={styles.inputContainer1}>
                            {subdiv !== "" || focus === 7 ? <Text style={[styles.labelFocused, focus !== 7 && {color: "gray"}]}>Sub Division</Text> : undefined}
                                <TextInput placeholder={focus === 7 ? '' : 'Sub Division'} value={subdiv} style={[styles.input, focus === 7 && styles.inputFocused]} id='subdiv' onFocus={() => setFocus(7)} onBlur={() => {
                                    focus === 7 ? setFocus(null) : undefined
                                }} />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputContainer1}>
                            {date !== "" || focus === 8 ? <Text style={[styles.labelFocused, focus !== 8 && {color: "gray"}]}>Date of Birth</Text> : undefined}
                                <TextInput placeholder={focus === 8 ? '' : 'Date of Birth'} value={date.toLocaleString()} style={[styles.input, focus === 8 && styles.inputFocused]} id='dob' onFocus={() => {
                                    setFocus(8)
                                    showDatepicker()
                                }} onBlur={() => {
                                    focus === 8 ? setFocus(null) : undefined
                                }} />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                            <View style={styles.inputContainer1}>
                            {age !== "" || focus === 9 ? <Text style={[styles.labelFocused, focus !== 9 && {color: "gray"}]}>Age</Text> : undefined}
                                <TextInput placeholder={focus === 9 ? '' : 'Age'} value={age} style={[styles.input, focus === 9 && styles.inputFocused]} id='age' onFocus={() => setFocus(9)} onBlur={() => {
                                    focus === 9 ? setFocus(null) : undefined
                                }} />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={[styles.inputContainer1, { flex: 1, top: 10 }]}>
                            {address !== "" || focus === 10 ? <Text style={[styles.labelFocused, {top: -9}, focus !== 10 && {color: "gray"}]}>Address</Text> : undefined}
                                <TextInput placeholder={focus === 10 ? '' : 'Address'} value={address} onChangeText={(val) => setAddress(val)} style={[styles.textField, focus === 10 && styles.inputFocused, { width: "95%" }]} id='address' multiline={true} numberOfLines={4} onFocus={() => setFocus(10)} onBlur={() => {
                                    focus === 10 ? setFocus(null) : undefined
                                }} />
                            </View>
                        </View>
                        <View style={styles.checkBoxContainer}>
            <CheckBox
                value={isChecked}
                onValueChange={setIsChecked}
                style={styles.checkbox}
            />
            <Text style={styles.label}>I agree with the <Text style={styles.link}>terms and conditions</Text>.</Text>
        </View>
        <TouchableOpacity
      style={styles.button}
    >
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
                    </View>

                {/* </ScrollView>
            </KeyboardAvoidingView> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 0.9,
        // backgroundColor: "red",
        width: "50%",
        // justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        height: Dimensions.get("window").height - 119,
    },
    font: {
        // flex: 0.1,
        fontWeight: "600",
        fontSize: 30,
        color: "black",
        marginBottom: 25
    },
    radioContainer: {
        // flex: 0.1,
        flexDirection: "row",
        // backgroundColor: "green",
        alignItems: 'center'
    },
    radioButton: {
        // backgroundColor: "blue",
        width: "7%",
        height: "65%",
        borderRadius: 200,
        borderWidth: 2,
        marginRight: 10
    },
    insideRadioButton: {
        // backgroundColor: "blue",
        width: "90%",
        height: "95%",
        borderRadius: 200,
        borderWidth: 2,
        marginLeft: 2,
        marginTop: 1
        // marginRight: 10,
    },
    formContainer: {
        // flex: 0.6,
        // backgroundColor: "green", 
        width: "75%",
        // justifyContent: 'space-around',
        // height: "100%",
        // height: Dimensions.get('screen').height,
        // height: 3050
        marginTop: 15
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        width: "100%",
        // backgroundColor: "blue",
        // flex: 1,
        height: 65,
        marginBottom: 0
    },
    inputContainer1: {
        width: '100%',
        // backgroundColor: 'red',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelFocused: {
        position: 'absolute',
        top: 4,
        fontSize: 12,
        color: 'blue', // Change color as needed
        left: 23,
        // top: 12,
        backgroundColor: "white",
        paddingHorizontal: 7,
        zIndex: 1
    },
    input: {
        borderColor: "#cbd5e0",
        borderWidth: 1,
        width: "90%",
        borderRadius: 10,
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 0.44,
        fontSize: 15
        // backgroundColor: "red"
    },
    inputFocused: {
        borderColor: 'blue', // Change border color when focused
    },
    textField: {
        borderColor: "#cbd5e0",
        borderWidth: 1,
        width: "45%",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15
    },
    dropdown: {
        height: "63%",
        borderColor: '#cbd5e0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '90%'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    keyboardAvoidingContainer: {
        // flex: 1,
        // flexGrow: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // height: '30%',
        // height: 460,
        backgroundColor: "gray",
        marginTop: 20
        // paddingTop: 20
    },
    scrollViewContent: {
        // flex: 1,
        // top: -40,
        // flexGrow: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "red"
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 7
        // marginBottom: 6,
    },
    checkbox: {
        width: 20,
        height: 20,
    },
    label: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333',
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#3B82F6', // Blue-700
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 35,
        // alignSelf: 'stretch', // Adjust width to the content
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5, // Adjust spacing as needed
        width: "80%",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: "3%"
      },
      buttonText: {
        color: '#FFFFFF', // White
        fontSize: 14, // Adjust font size as needed
        fontWeight: 'bold',
      },
})