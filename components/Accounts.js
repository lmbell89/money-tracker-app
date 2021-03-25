import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { deleteAccount } from '../db/database'

const Accounts = ({ accounts }) => {
  console.log(accounts)

  return (
    <View>      
      {accounts.map(account => {
        <View>
          <View key={account.id} style={styles.container}>
            <Text style={styles.text}>
              {account.name}
            </Text>
            <Text style={styles.text}>
              {`£${account.balance.toFixed(2)}`}
            </Text>
          </View>

          <Button onPress={deleteAccount}>
            Delete
          </Button>
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

export default Accounts