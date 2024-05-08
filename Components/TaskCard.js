import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from "./CheckBox";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
const TaskCard = (props) => {
  const id = props.task.task_id;
  const navigation = useNavigation();

  const completeTask = () => {
    // Call an API to remove the task
    // For demonstration, I'll just call the onRemoveTask function passed from the parent component
    props.setCurrTask(props.task);

    if(props.task.type === 'prescription'){
      console.log('Prescription');
      navigation.navigate("Patient Prescription");
    }

  };

  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  return (
      <View style={styles.cardContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.title}>Task Type: </Text>
          <Text style={styles.description}>{props.task.type}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.title}>Deadline: </Text>
          <Text style={styles.description}>{props.task.deadline}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.title}>Patient Name: </Text>
          <Text style={styles.description}>{props.task.deadline}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.title}>Patient Address: </Text>
          <Text style={styles.description}>{props.task.deadline}</Text>
        </View>

        {/* Complete Task */}

        <TouchableOpacity style={[styles.navButton, styles.submitButton]} onPress={completeTask}>
          <Text style={[styles.navButtonText, styles.submitButtonText]}>Complete Task</Text>
        </TouchableOpacity>

      </View>
    
  );
};

const styles = StyleSheet.create({

  cardContainer: {
    flex: 1,
    alignSelf: "stretch",
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 50
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
    marginLeft: 50 // Align checkbox to the right
  },
  navButton: {
    height: '40%',
    width: '30%',
    alignSelf: "flex-end",
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
});

export default TaskCard;
