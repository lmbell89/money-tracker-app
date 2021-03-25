import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Item = ({id, name, balance}) => {
  return (
    <View key={id} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{`£${balance.toFixed(2)}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    flex: 1
  }
})

export default Item