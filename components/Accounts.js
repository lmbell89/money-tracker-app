import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const Accounts = ({ accounts, removeAccount }) => {
  return (
    <View>      
      {accounts?.map(({ id, name, balance }) => {
        return (
          <View key={id} style={styles.container}>
            <Text style={styles.text}>
              {name}
            </Text>

            <Text style={styles.text}>
              {`£${balance.toFixed(2)}`}
            </Text>

            <Button onPress={() => removeAccount(id)}>
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
    flexWrap: 'wrap'
  },
  text: {
    flex: 1
  }
})

export default Accounts