import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
// import NavbarFW2 from "../../components/NavbarFW2";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from "./TaskCard";
const DatePatient = (props) => {
    const navigation = useNavigation();
    const [currInd, setcurrInd] = useState(0);

    const [tasksList, currTasksList] = useState([
        { id: 1, title: 'Task 1', description: 'Description for Task 1' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3' },
        { id: 4, title: 'Task 4', description: 'Description for Task 4' },
        { id: 5, title: 'Task 5', description: 'Description for Task 5' },
        { id: 6, title: 'Task 1', description: 'Description for Task 1' },
        { id: 7, title: 'Task 2', description: 'Description for Task 2' },
        { id: 8, title: 'Task 3', description: 'Description for Task 3' },
        { id: 9, title: 'Task 4', description: 'Description for Task 4' },
        { id: 10, title: 'Task 5', description: 'Description for Task 5' },])

    const length = 10;

    const prev = () => {
        if (currInd > 0) {
            setcurrInd(currInd - 1);
        }
    }

    const next = () => {
        if (currInd < length - 1) {
            setcurrInd(currInd + 1);
        }
    }
    const [currentPage, setCurrentPage] = useState(0);
    const cardsPerPage = 4;

    const totalPages = Math.ceil(tasksList.length / cardsPerPage);
    const startIndex = currInd * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    // const currentTasks = tasksList.slice(startIndex, endIndex);



    return (
        <View >
            <Text
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    marginTop: 10,
                    fontSize: 36,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#686868",
                }}
            >
                Tasks to complete on this Date
            </Text>

            {/* main box */}
            <View style={styles.container}>

                {/* tasks list */}
                <View style={{flex: 1, zIndex: 1}}>
                    <FlatList
                        data={tasksList}
                        renderItem={({ item }) => <TaskCard task={item} />}
                        keyExtractor={(item) => item.id.toString()}
                    />

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "80%",
        width: "90%",
        marginTop: "12%",
        position: "absolute",
        alignSelf: "stretch", // Equivalent to h-fit (height fit)
        alignSelf: "flex-start",
        alignSelf: "center", // Equivalent to w-fit (width fit)
        backgroundColor: "#ADD8E6",
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
        padding: 10
    },

    navigationContainer: {
        flexDirection: 'row',
        gap: 60,
        justifyContent: 'center',
        marginTop: 20,
    },
    navButton: {
        height: '40%',
        width: '25%',
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },


});

export default DatePatient;
