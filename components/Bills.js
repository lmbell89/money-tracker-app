import React from 'react'
import { View, StyleSheet } from 'react-native'

const Bills = ({ bills }) => {
  return (
    <View>
      {bills?.map(bill => {
          <View key={id} style={styles.container}>
            <Text style={styles.text}>
              {bill.name}
            </Text>
            <Text style={styles.text}>
              {`£${bill.value.toFixed(2)}`}
            </Text>
          </View>
      })}
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

export default Bills