import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';
import NewPatientsCard from './NewPatientsCard';

export default function Inbox(props) {
  const [notifications, setNotifications] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const cardsPerPage = 2;
    const [filteredPatientCards, setFilteredPatientCards] = useState(notifications);

    const handleSearchInputChange = (text) => {
        setSearchQuery(text);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (filteredPatientCards) {
            const totalPagesCount = Math.ceil(
                filteredPatientCards.length / cardsPerPage
            );
            setTotalPages(totalPagesCount);
        }
    }, [filteredPatientCards, cardsPerPage]);

    useEffect(() => {
        if (notifications) {
            const filteredCards = notifications.filter((patient) =>
                patient.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPatientCards(filteredCards);
            setCurrentPage(1); // Reset to first page when search query changes
        }
    }, [notifications, searchQuery]);

    async function getNotifications() {
        try {
            props.setLoad(true);
            const result = await fetch(props.URL+"/fw/viewAllTasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.jwtToken
                }
            }).then(res => res.json());

            if (result && result.length > 0) {
                setNotifications(result);
            }
            props.setLoad(false);
        }
        catch {
            props.setLoad(false);
            props.setAlert({type: "danger", msg: "Server Error Occurred!"})
        }
    }

    useEffect(() => {
        if (!notifications && props.jwtToken && !props.fwNotification)
            getNotifications();
    }, [notifications, props.jwtToken])

    useEffect(() => {
        if (props.jwtToken && props.fwNotification)
            getNotifications();
    }, [props.jwtToken, props.fwNotification])

    return (
        <View style={{ alignItems: 'center', height: Dimensions.get('window').height - 65 }}>
            {notifications && <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 20, width: '40%', marginTop: 40, paddingLeft: 20 }}
                onChangeText={handleSearchInputChange}
                value={searchQuery}
                placeholder="Search Patients"
            />}

            {notifications ? <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10, marginTop: 40 }}>Inbox</Text> : undefined}

            {notifications ? (
                <View style={{ marginHorizontal: 10, backgroundColor: '#f1f1f4', padding: 4, paddingHorizontal: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 20, width: "40%" }}>
                    {filteredPatientCards &&
                        filteredPatientCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                            .map((patient, index) => (
                                <View key={index} style={{ marginVertical: 10 }}>
                                    <NewPatientsCard patient={patient} keyItem={index} jwtToken={props.jwtToken} setAlert={props.setAlert} setLoad={props.setLoad} />
                                </View>
                            ))}
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                        {/* Pagination buttons */}
                        <Button
                            title="Previous"
                            disabled={currentPage === 1}
                            onPress={() => handlePageChange(currentPage - 1)}
                        />
                        {/* Render page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                title={pageNumber.toString()}
                                onPress={() => handlePageChange(pageNumber)}
                            />
                        ))}
                        <Button
                            title="Next"
                            disabled={currentPage === totalPages}
                            onPress={() => handlePageChange(currentPage + 1)}
                        />
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 20, width: 320, height: 160 }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#333' }}>
                    Inbox is Empty!
                  </Text>
                </View>
              </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
    }
})
