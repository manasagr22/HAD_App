import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
    // Dummy data for demonstration
    const [items, setitems] = useState({
        '2024-05-01': [{ name: 'Appointment 1' }],
        '2024-05-02': [{ name: 'Appointment 2' }],
        '2024-05-04': [{ name: 'Appointment 3' }],
        '2024-05-05': [{ name: 'Appointment 3' }],
    
    })

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // State to store selected date
    const [selectedDate, setSelectedDate] = useState('');

    // Function to mark dates with appointments
    const markedDates = {};
    Object.keys(items).forEach((date) => {
        markedDates[date] = { marked: true };
    });

    // Mark today's date
    markedDates[formattedToday] = { selected: true, marked: true };

    return (
        <View style={styles.container}>
            <Calendar
                // Mark dates with appointments
                markedDates={{ ...markedDates, [selectedDate]: { selected: true, selectedColor: 'maroon' } }}
                // Callback that gets called when a date is pressed
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                }}
                // Current selected date
                current={selectedDate}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '15%',
        height: '100%',
        marginTop: '10%',
    },
});

export default CalendarComponent;
