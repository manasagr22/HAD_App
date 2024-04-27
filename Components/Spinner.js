import React, { Component } from 'react'
import spinner from '../Images/loader1.gif'
import { Dimensions, Image, StyleSheet, View } from 'react-native';

export default class Spinner extends Component {
  render() {
    return (
      // <div className='spin'>
      //   <div className='text-center' id='loading'>
      //       <img src={spinner} alt='Loading...' id='SpinnerId'/>
      //   </div>
      // </div>
      <View style={styles.spin}>
        <Image source={require('../Images/loader1.gif')} style={styles.image}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  spin: {
    position: 'absolute',
    // top: "50%",
    zIndex: 36,
    height: "100%",
    width: "100%",
    backgroundColor: 'rgba(0,0,0,1)',
    // left: "50%",
    // transform: [{ translateX: -(Dimensions.get('window').width)/2 } ,{ translateY: -(Dimensions.get('window').height)/2 }],
  },
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto"
  }
})