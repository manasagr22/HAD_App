import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function MessageBox(props) {
  return (
    <View key={props.key}>
    {props.senderId === props.userId ? 
        <View style={styles.msgContainerRight}>

        </View> : 
        <View style={styles.msgContainerLeft}>
        
        </View>
    }
    </View>
  )
}

const styles = StyleSheet.create({
    msgContainerRight: {
        backgroundColor: "blue"
    },
    msgContainerLeft: {
        backgroundColor: "#f2f4f6",
    }
})