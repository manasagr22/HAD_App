import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Notification() {
  return (
    <View style={styles.mainContainer}>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    backgroundColor: "blue",
    width: 12,
    height: 12,
    borderRadius: 6,
    bottom: 0,
    right: 9,
  }
})
