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
import Sound from 'react-native-sound'
import RNFS from 'react-native-fs';
const PatientQn = (props) => {
    const navigation = useNavigation();
    //   const loginActiveUser = AsyncStorage.getItem('loginActiveUser');
    const [active, setActive] = useState(false);
    const [questionList, setQuestionList] = useState([]);

    const [currQInd, setCurrentQInd] = useState(0);
    const [currCategory, setCurrentCategory] = useState("mcq");
    const [selectedValue, setSelectedValue] = useState(null);
    const [responses, setResponses] = useState([]);
    const [recording, setRecording] = useState(null);
    const [play, setPlay] = useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [paused, setPaused] = useState(true);
    const [sound, setSound] = useState(null);

    const handleSelectValue = (value) => {
        setSelectedValue(value);
    }

    const handleSelectMCQ = (questionIndex, option, option_letter) => {
        setResponses(prevResponses => {
            const updatedResponses = [...prevResponses];
            // Ensure the responses array has enough elements to accommodate the question index
            while (updatedResponses.length <= questionIndex) {
                updatedResponses.push({ qid: questionList[questionIndex].publicId });
            }
            // Update the response for the specified question index
            updatedResponses[questionIndex] = { ...updatedResponses[questionIndex], mcqAns: option_letter };
            return updatedResponses;
        });
    };

    const handleSelectRange = (value, questionIndex) => {
        setResponses(prevResponses => {
            const updatedResponses = [...prevResponses];
            // Ensure the responses array has enough elements to accommodate the question index
            while (updatedResponses.length <= questionIndex) {
                updatedResponses.push({ qid: questionList[questionIndex].publicId });
            }
            // Update the response for the specified question index
            updatedResponses[questionIndex] = { ...updatedResponses[questionIndex], rangeAns: value };
            return updatedResponses;
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (questionList.length === 0) {
                    const URL = props.URL + "/fw/getAllQ";

                    // url_get_qn.pathname = '/fw/getAllQ';
                    const params = new URLSearchParams({
                        name: "adminQuestionnaire",
                    }).toString();
                    const url = `${URL}?${params}`;
                    // url_get_qn.searchParams.set('name', 'adminQuestionnaire');
                    console.log(url);

                    const key = "Bearer " + props.jwtToken;
                    console.log(key);
                    const result = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: key,
                        },
                    }).then((res) => res.json());
                    console.log(result);
                    setQuestionList(result);
                    setCurrentQInd(0);
                    // Assuming data is an array of question objects
                    // console.log(questionList);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [questionList, props.jwtToken]);

    useEffect(() => {
        if (questionList.length > 0)
            setCurrentCategory(questionList[currQInd].type);

    }, [currQInd]);

    const nextQuestion = () => {
        if (currQInd < questionList.length - 1) {
            setCurrentQInd(currQInd + 1);
        } else {
            alert("No more questions!");
        }
    };

    const prevQuestion = () => {
        if (currQInd >= 0) {
            setCurrentQInd(currQInd - 1);
        } else {
            alert("No more questions!");
        }
    };

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const submitForm = async () => {
        try {
            console.log(responses);
            const URL = props.URL + "/fw/qLogic";
            const key = "Bearer " + props.jwtToken;
            const patientId = await AsyncStorage.getItem('patientId');

            console.log(patientId + ' teri maa ki chut');
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key,
                },
                body: JSON.stringify({
                    pid: patientId,
                    qnName: 'adminQuestionnaire',
                    answers: responses
                }),
            })
            if(response.ok)
                props.setAlert({ type: "success", msg: "Form Submitted Successfully" });
            else
                props.setAlert({ type: "danger", msg: "Could Not Submit Form :(" });    

        } catch (err) {
            props.setAlert({ type: "danger", msg: "Could Not Submit Form :(" });
            console.log(err);
        }

        setTimeout(() => {
            props.setAlert(null);
        }, 1800)
    };

    const handleAudioSubmit  = async (qid) => {
        const patientId = await AsyncStorage.getItem('patientId');

        const URL = props.URL + "/fw/uploadDescMsg";

        try{
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.jwtToken,
                },
                body: JSON.stringify({
                    pid: patientId,
                    qid: qid,
                    audio: audioFile
                }),
            })
        }catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
        const load = () => {
            return new Promise((resolve, reject) => {
                if (!audioFile) {
                    props.setAlert({ type: "danger", msg: "Error while saving Audio" })
                    return reject('file path is empty');
                }

                Sound.setCategory('Playback');
                const directory = RNFS.DocumentDirectoryPath;

                const fileName = 'test1.wav';
                const filePath = `${directory}/${fileName}`;
                RNFS.writeFile(filePath, audioFile, 'base64')

                const s = new Sound(filePath, '', error => {
                    if (error) {
                        props.setAlert({ type: "danger", msg: "Error while saving Audio" })
                        return reject(error);
                    }
                })

                setSound(s);

                setLoaded(true);
                return resolve();
            })
        }

        const playAudio = async () => {
            if (!loaded) {
                try {
                    await load();
                }
                catch {
                    props.setAlert({ type: "danger", msg: "Error while saving Audio" })
                }
            }
        }

        if (play && audioFile) {
            playAudio();
        }
    }, [play, audioFile])

    useEffect(() => {
        async function playAudio() {
            sound.play(success => {
                if (success) {
                    //                      setLoaded(false)
                    setPaused(true)
                    setPlay(false);
                }
            })
        }

        const pause = () => {
            if (sound) {
                sound.pause();
            }
        }

        if (sound && play && !paused) {
            console.log(sound)
            if (sound['_duration'] === -1) {
                setPlay(false);
                setPaused(!paused);
            }
            else
                playAudio();
        }
        else if (sound && !play && paused)
            pause();
        //            else if(sound && !play && !paused)
        //                setPlay(true);
    }, [sound, play, paused])

    useEffect(() => {
        async function recordAudio() {
            setRecording(true);
        }

        if (recording)
            recordAudio();
    }, [recording])

    return (
        <View style={{ flex: 1 }}>
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
                Questionnaire
            </Text>

            {/* main box */}
            <View style={styles.container}>
                {/* TAB CONTAINER */}
                <View style={styles.tabContainer}>
                    {currCategory === "mcq" ? <LinearGradient
                        colors={["#a260df", "#0695e2"]} // Define your gradient colors
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.tabButtonContainer}
                    >
                        <Text
                            style={[
                                styles.tabButton,
                                currCategory === "mcq" && styles.activeTabButton,
                            ]}
                        >
                            Objective
                        </Text>
                    </LinearGradient> : <View
                        style={[
                            styles.tabButtonContainer,
                            currCategory === "mcq" && styles.activeTabButtonContainer,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabButton,
                                currCategory === "mcq" && styles.activeTabButton,
                            ]}
                        >
                            Objective
                        </Text>
                    </View>}

                    {currCategory === "range" ? <LinearGradient
                        colors={["#a260df", "#0695e2"]} // Define your gradient colors
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.tabButtonContainer}
                    >
                        <Text
                            style={[
                                styles.tabButton,
                                currCategory === "range" && styles.activeTabButton,
                            ]}
                        >
                            Range
                        </Text>
                    </LinearGradient> : <View
                        style={[
                            styles.tabButtonContainer,
                            currCategory === "range" && styles.activeTabButtonContainer,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabButton,
                                currCategory === "range" && styles.activeTabButton,
                            ]}
                        >
                            Range
                        </Text>
                    </View>}



                    {currCategory === "descriptive" ? <LinearGradient
                        colors={["#a260df", "#0695e2"]} // Define your gradient colors
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.tabButtonContainer}
                    >
                        <Text
                            style={[
                                styles.tabButton,
                                currCategory === "descriptive" && styles.activeTabButton,
                            ]}
                        >
                            Descriptive
                        </Text>
                    </LinearGradient> : <View
                        style={[
                            styles.tabButtonContainer,
                            currCategory === "descriptive" && styles.activeTabButtonContainer,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabButton,
                                currCategory === "descriptive" && styles.activeTabButton,
                            ]}
                        >
                            Descriptive
                        </Text>
                    </View>}
                </View>

                {questionList.length > 0 && <View style={[styles.qcontainer, styles.form]}>
                    {/* MAIN QUESTION */}


                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            {currQInd + 1 + ") "}
                            {questionList[currQInd].question}
                        </Text>


                        {currCategory === "mcq" && (
                            <View style={styles.mcqContainer}>
                                <TouchableOpacity
                                    key={1}
                                    style={[styles.optionContainer, selectedOption === 1 && styles.selectedOption]}
                                    onPress={() => { handleSelectMCQ(currQInd, questionList[currQInd].option1, "A"); handleOptionSelect(1) }}
                                >
                                    <View style={styles.radioButton}>
                                        {selectedOption === 1 && <View style={styles.radioInnerCircle} />}
                                    </View>
                                    <Text style={styles.optionText}>{questionList[currQInd].option1}</Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    key={2}
                                    style={[styles.optionContainer, selectedOption === 2 && styles.selectedOption]}
                                    onPress={() => { handleSelectMCQ(currQInd, questionList[currQInd].option2, "B"); handleOptionSelect(2) }}
                                >
                                    <View style={styles.radioButton}>
                                        {selectedOption === 2 && <View style={styles.radioInnerCircle} />}
                                    </View>
                                    <Text style={styles.optionText}>{questionList[currQInd].option2}</Text>
                                </TouchableOpacity>



                                <TouchableOpacity
                                    key={3}
                                    style={[styles.optionContainer, selectedOption === 3 && styles.selectedOption]}
                                    onPress={() => { handleSelectMCQ(currQInd, questionList[currQInd].option3, "C"); handleOptionSelect(3) }}
                                >
                                    <View style={styles.radioButton}>
                                        {selectedOption === 3 && <View style={styles.radioInnerCircle} />}
                                    </View>
                                    <Text style={styles.optionText}>{questionList[currQInd].option3}</Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    key={4}
                                    style={[styles.optionContainer, selectedOption === 4 && styles.selectedOption]}
                                    onPress={() => { handleSelectMCQ(currQInd, questionList[currQInd].option4, "D"); handleOptionSelect(4) }}
                                >
                                    <View style={styles.radioButton}>
                                        {selectedOption === 4 && <View style={styles.radioInnerCircle} />}
                                    </View>
                                    <Text style={styles.optionText}>{questionList[currQInd].option4}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {currCategory === "descriptive" && (
                            <View >
                                <View style={styles.descriptiveContainer}>
                                    <TouchableOpacity style={[styles.iconSearch, { left: 10 }]} onPress={() => setRecording(!recording)}>
                                        <Feather name="mic" size={24} color={recording ? "blue" : "red"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.iconSearch, { left: 40 }]} onPress={() => {
                                        setPlay(!play)
                                        setPaused(!paused)
                                    }}>
                                        {play == false ? <AntDesign name="playcircleo" size={24} color="black" />
                                            : <FontAwesome6 name="circle-pause" size={24} color="black" />}
                                    </TouchableOpacity>
                                    {recording !== null && <AudioRecorder2 recording={recording} setRecording={setRecording} setAudioFile={setAudioFile} setSound={setSound} setLoaded={setLoaded} />}

                                </View>
                                <TouchableOpacity style={styles.navButtonAudio} onPress={()=>handleAudioSubmit(questionList[currQInd].publicId)}>
                                    <Text style={[styles.navButtonText, styles.submitButtonText]}>Submit Audio</Text>

                                </TouchableOpacity>
                            </View>

                        )}
                        {currCategory === "range" && (
                            <View style={styles.rangeContainer}>
                                {[...Array(10)].map((_, index) => (
                                    <TouchableOpacity key={index} style={[styles.rangeButton, selectedValue === index + 1 && styles.selectedButton]}
                                        onPress={() => { handleSelectRange(index + 1, currQInd); handleSelectValue(index + 1) }}
                                    >
                                        <Text style={styles.rangeButtonText}>{index + 1}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>}


                {/* PREV NEXT */}

                <View style={styles.navigationContainer}>
                    {currQInd > 0 ? <TouchableOpacity style={styles.navButton} onPress={prevQuestion}>
                        <Text style={styles.navButtonText}>Previous</Text>
                    </TouchableOpacity> : null}


                    {currQInd === questionList.length - 1 ? (
                        <TouchableOpacity style={[styles.navButton, styles.submitButton]} onPress={submitForm}>
                            <Text style={[styles.navButtonText, styles.submitButtonText]}>Submit</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
                            <Text style={styles.navButtonText}>Next</Text>
                        </TouchableOpacity>
                    )}
                </View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "45%",
        width: "50%",
        marginTop: "12%",
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
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        borderColor: "#E5E7EB", // Use appropriate color for border
    },
    tabButtonContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E5E7EB", // Use appropriate color for border
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    activeTabButtonContainer: {
        // Change to appropriate color for active tab button
        color: "#FFFFFF"
    },
    tabButton: {
        fontSize: 18, // Adjust text size as needed
        textAlign: "center",
        color: "#4B5563", // Use appropriate color for text
    },
    activeTabButton: {
        color: "#FFFFFF", // Change to appropriate color for active tab button text
    },
    qcontainer: {
        margin: 8,
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 24,
    },
    form: {
        // Add additional form styles if needed
    },
    questionContainer: {
        flexDirection: "column",
    },
    questionText: {
        marginBottom: 8,
        fontSize: 20,
        fontWeight: "bold",
        color: "#333", // Adjust color as needed
    },
    mcqContainer: {
        marginTop: 16,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    optionText: {
        marginLeft: 8,
        fontSize: 16,
        color: "#333", // Adjust color as needed
    },
    radioButton: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },

    descriptiveContainer: {

        marginTop: 16,
    },
    answerLabel: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333", // Adjust color as needed
    },
    answerInput: {
        borderWidth: 1,
        borderColor: "#ccc", // Adjust color as needed
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        color: "#333", // Adjust color as needed
        height: 100,
    },
    rangeContainer: {
        flexDirection: "row",
        marginTop: 16,
    },
    rangeButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc", // Adjust color as needed
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 4,
    },
    rangeButtonText: {
        fontSize: 16,
        color: "#333", // Adjust color as needed
    },
    selectedButton: {
        backgroundColor: '#e0e0e0', // or any other highlight color
    },

    navigationContainer: {
        flexDirection: 'row',
        gap: 60,
        justifyContent: 'center',
        marginTop: 20,
    },
    navButtonAudio: {
        height: '50%',
        width: '25%',
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:"40%", 
        marginTop: "auto"
    },
    navButton: {
        height: '50%',
        width: '15%',
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    submitButton: {
        backgroundColor: 'green', // Green color
    },
    submitButtonText: {
        fontWeight: 'bold',
    },
    iconSearch: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -12 }],
        // backgroundColor: 'green',
    },
});

export default PatientQn;
