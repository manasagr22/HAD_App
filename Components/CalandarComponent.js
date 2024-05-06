import React, { useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = (props) => {
    // Dummy data for demonstration
    const [items, setitems] = useState({
        "2024-05-08": [
          {
            "task_id": 1,
            "type": "work",
            "deadline": "2024-05-10",
            "date": "2024-05-06",
            "description": "Complete project proposal"
          },
          {
            "task_id": 2,
            "type": "work",
            "deadline": "2024-05-08",
            "date": "2024-05-06",
            "description": "Send follow-up emails"
          }
        ],
        "2024-05-07": [
          {
            "task_id": 3,
            "type": "personal",
            "deadline": "2024-05-12",
            "date": "2024-05-07",
            "description": "Review project draft"
          },
          {
            "task_id": 4,
            "type": "work",
            "deadline": "2024-05-10",
            "date": "2024-05-07",
            "description": "Attend team meeting"
          }
        ]
      }
      )

    useEffect(() => {
        // get all tasks
        // then create item json
        const item_json = {}

        
    }, []);

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    console.log(formattedToday)
    // State to store selected date
    const [selectedDate, setSelectedDate] = useState('');

    // Function to mark dates with appointments
    const markedDates = {};
    Object.keys(items).forEach((date) => {
        markedDates[date] = { marked: true };
    });

    // Mark today's date
    markedDates[formattedToday] = { selected: true};

    useEffect(() => {
        if(formattedToday !== null){
            props.setCurrentSelectedDate(formattedToday)
        }
    }, []);

    return (
        <View style={styles.container}>
            <Calendar
                // Mark dates with appointments
                markedDates={{ ...markedDates, [props.currentSelectedDate]: { selected: true, selectedColor: 'maroon' } }}
                // Callback that gets called when a date is pressed
                onDayPress={(day) => {
                    props.setCurrentSelectedDate(day.dateString); 
                }}
                // Current selected date
                current={props.currentSelectedDate}
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
