import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const Spinner = () => {
  return (
    <View style={styles.view}>
      <ActivityIndicator size='large' />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default Spinner