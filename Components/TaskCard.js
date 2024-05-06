import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from "./CheckBox";

const TaskCard = ({ task }) => {
  const id = task.task_id;

  const handleCheckboxPress = () => {
    // Call an API to remove the task
    // For demonstration, I'll just call the onRemoveTask function passed from the parent component

  };

  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.title}>Task Type: </Text>
          <Text style={styles.description}>{task.type}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.title}>Deadline: </Text>
          <Text style={styles.description}>{task.deadline}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.title}>Description: </Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
        {/* <CheckBox
          style={styles.checkbox}
          title="Task Done"
          isChecked={false}  // You can set this to true if the task is completed initially
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  cardContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#666666',
  },
  checkbox: {
    marginTop: 10,
    marginLeft: 50 // Align checkbox to the right
  },
});

export default TaskCard;
