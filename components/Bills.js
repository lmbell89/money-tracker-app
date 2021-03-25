import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const Bills = ({ bills, deleteFn }) => {
  return (
    <View>
      {bills?.map(bill => {
        return (
          <View>
            <View key={bill.id} style={styles.container}>
              <Text style={styles.text}>
                {bill.name}
              </Text>

              <Text style={styles.text}>
                {`£${bill.value.toFixed(2)}`}
              </Text>
            </View>
            <Button onPress={deleteFn}>
                Delete
              </Button>
          </View>
        )
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