import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavBarPatient from './NavBarPatient';

export default function LoggedInPatient ({route}) {
    // const { patientId } = route.params;

    return(
        <View>
            <NavBarPatient />
            <View style={styles.mainContainer}>
                <Text >Logged In </Text>
            </View>
        </View>
    )
   
}

const styles = StyleSheet.create({
    mainContainer: {
    height: Dimensions.get('window').height - 65,
    // backgroundColor: '#E5E7EB'
    backgroundColor: '#f5f6f9'
}

})
