import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function NotificationNumber(props) {
  return (
    <View style={styles.mainContainer}>
        <Text style={styles.textContainer}>{props.countNotification}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      position: 'absolute',
      backgroundColor: "blue",
      minWidth: 32,
      minHeight: 20,
      borderRadius: 16,
      bottom: 8,
      right: 9,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 3,
      paddingHorizontal: 5,
    },
    textContainer: {
        fontSize: 14,
        color: 'white',
        fontWeight: '700',
    }
  })