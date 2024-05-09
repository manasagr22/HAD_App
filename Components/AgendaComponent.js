import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

const AgendaComponent = () => {
  // Dummy data for demonstration
  const items = {
    '2024-05-01': [{ name: 'Task 1 for 2024-05-01' }],
    '2024-05-02': [{ name: 'Task 1 for 2024-05-02' }],
    '2024-05-03': [],
    '2024-05-04': [{ name: 'Task 1 for 2024-05-04' }, { name: 'Task 2 for 2024-05-04' }],
  };

  // State to store selected date
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        // Callback that gets called when items for a certain month should be loaded
        loadItemsForMonth={(month) => {
          //console.log('Month: ', month);
          // Simulate data loading
          setTimeout(() => {
            //console.log('Data loaded');
          }, 1000);
        }}
        // Specify how agenda items should be rendered
        renderItem={(item) => {
          if (!selectedDate || item.date === selectedDate) {
            return (
              <View style={styles.item}>
                <Text>{item.name}</Text>
              </View>
            );
          } else {
            return null;
          }
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        // Specify how each date should be rendered
        // renderDay={(day, item) => {
        //   return (
        //     <View style={styles.day}>
        //       <Text style={styles.dayText}>{day ? day.day : '...'}</Text>
        //     </View>
        //   );
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  day: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AgendaComponent;
