import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UpdateTextCard from './UpdateTextCard';
import { useNavigation } from '@react-navigation/native';

const NewPatientsCard = (props) => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [isHovered, setIsHovered] = useState(false);
    const navigation = useNavigation();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleButtonPress = () => {
        // navigation.navigate('PatientRecord', {
        //     patientId: props.patient.aabhaId,
        //     patientName: props.patient.firstName + " " + props.patient.lastName,
        //     publicId: props.patient.pid
        // });
    };

    return (
        <TouchableOpacity
            onPress={handleButtonPress}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ marginVertical: 10 }}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', position: "absolute", zIndex:1 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>
                        Patient Name: <Text style={{ fontFamily: 'CrimsonText-Bold', color: "blue" }}>{props.patient.name}</Text>
                    </Text>
                    <Text style={{ fontSize: 22, color: 'black', fontWeight: "bold" }}>
                        Task: <Text style={{ fontFamily: 'CrimsonText-Bold', color: "gray" }}>{props.patient.type}</Text>
                    </Text>
                </View>
                <UpdateTextCard message={props.patient.deadline} />
                {arr.map((ele, index) => (
                    <View
                        key={index}
                        style={{
                            width: '100%',
                            height: 12,
                            backgroundColor: isHovered ? 'gray' : 'white',
                            borderRadius: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                        }}
                    />
                ))}
            </View>
        </TouchableOpacity>
    );
};

export default NewPatientsCard;
