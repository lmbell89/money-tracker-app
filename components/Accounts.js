import React from 'react'
import { View, StyleSheet } from 'react-native'

const Accounts = ({ accounts }) => {
  return (
    <View>
      {accounts?.map(account => {
          <View key={id} style={styles.container}>
            <Text style={styles.text}>
              {account.name}
            </Text>
            <Text style={styles.text}>
              {`£${account.balance.toFixed(2)}`}
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

export default Accounts