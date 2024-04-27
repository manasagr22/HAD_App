import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Alert(props) {
  return (
    <View style={[styles.alertBox, props.alert.type === "success" ? {backgroundColor: "lightgreen"} : {backgroundColor: "#f2b3b9"}]}>
        {props.alert.type === "success" ? <AntDesign name="checkcircle" size={30} color="green" /> : <MaterialIcons name="error" size={24} color="#df0016" />}
        <Text style={[styles.msg, props.alert.type === "success" ? {color: "green"} : {color: "#df0016"}]}>{props.alert.msg}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    alertBox: {
        flexDirection: "row",
        maxWidth: "100%",
        position: "absolute",
        zIndex: 100,
        top: 0,
        height: "7%",
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        // borderTopRightRadius: 5,
        // borderTopLeftRadius: 5,
        alignItems: "center",
        paddingBottom: 5
    },
    msg: {
        marginLeft: 10,
        color: "green",
        fontSize: 25,
        fontFamily: "CrimsonText-Bold",
        bottom: 3
    }
})
