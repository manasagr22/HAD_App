import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
// import NavbarFW2 from "../../components/NavbarFW2";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from "./TaskCard";
const DateFW = (props) => {
    const navigation = useNavigation();
    const [currInd, setcurrInd] = useState(0);
    const currDate = props.currentSelectedDate;

    //console.log('Date: ' + currDate);

    


    // const [currDayTaskList, setcurrTasksList] = useState([
    //     {
    //       "task_id": 1,
    //       "type": "prescription",
    //       "deadline": "2024-05-10",
    //       "date": "2024-05-06",
    //       'patientName': 'Mukul Bhosdiwala',
    //       "description": "Complete project proposal",
    //       "medicine": "Beer pee BC"
    //     },
    //     {
    //       "task_id": 2,
    //       "type": "work",
    //       "deadline": "2024-05-08",
    //       "date": "2024-05-06",
    //       "description": "Send follow-up emails"
    //     },
    //     {
    //       "task_id": 3,
    //       "type": "personal",
    //       "deadline": "2024-05-12",
    //       "date": "2024-05-07",
    //       "description": "Review project draft"
    //     },
    //     {
    //       "task_id": 4,
    //       "type": "work",
    //       "deadline": "2024-05-10",
    //       "date": "2024-05-07",
    //       "description": "Attend team meeting"
    //     }
    //   ]
      
    // )



    useEffect(() => {
        // change curr task list from backend
        // from currDate

        const fetchCurrDateTasks = async () => {


            const URL = props.URL + '/fw/viewAllTasksByDate'

            const key = "Bearer " + props.jwtToken;
            const params = new URLSearchParams({
                date: currDate,
            }).toString();
            const url = `${URL}?${params}`;

            try{
                console.log(currDate)
                if(currDate.length > 0){
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: key,
                    },
                }).then(response => response.json());

                // if(response.ok) {
                // const responseJson = await response.json();
                // console.log(responseJson)
                // }
                // else {
                //     console.log(response)
                // }
            
                // console.log(response)
                props.setcurrDayTaskList(response);
                //console.log('hello ', props.currDayTaskList)
                
                
            }

            }catch(e) {
                // props.setAlert({ type: "danger", msg: "Some Error Occurred!" });
                console.log(e)
            }
        }
        
        if(currDate.length > 0 && props.jwtToken)
            fetchCurrDateTasks();

        setTimeout(() => {
            props.setAlert(null);
        }, 1800)
        
    }, [currDate, props.jwtToken]);



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
    // const [currentPage, setCurrentPage] = useState(0);
    // const cardsPerPage = 4;

    // const totalPages = Math.ceil(props.currDayTaskList.length / cardsPerPage);
    // const startIndex = currInd * cardsPerPage;
    // const endIndex = startIndex + cardsPerPage;
    // // const currentTasks = tasksList.slice(startIndex, endIndex);



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
                <View style={{ flex: 1, zIndex: 1 }}>
                    {(props.currDayTaskList).length > 0 ? <FlatList
                        data={props.currDayTaskList}
                        renderItem={({ item }) => <TaskCard task={item} setCurrTask={props.setCurrTask}/>}
                        keyExtractor={(item) => item.id.toString()}
                    /> : <View><Text style={{
                        marginBottom: 10,
                        
                        marginTop: 10,
                        fontSize: 26,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#686868",
                    }}>No Tasks on this day :)</Text></View>}
                    

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

export default DateFW;
