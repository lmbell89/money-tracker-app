import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import isCurrency from 'validator/lib/isCurrency'

const AddPage = ({ navigation }) => {
  const [name, setName] = useState("")
  const [balance, setBalance] = useState("")

  const submit = () => {
    navigation.navigate("HomePage", { 
      name, 
      balance: parseFloat(balance), 
      type: 'account'
    })
  }

  const currencyChange = (str) => {
    if (isCurrency(str, {digits_after_decimal: [1, 2]})) {
      setBalance(str)
    }
  }

  return (
    <View style={styles.container}>

      <TextInput 
        label="Name" 
        style={styles.input} 
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        left={<TextInput.Affix text="£ " />}
        label="Balance"
        keyboardType="numeric"
        value={balance}
        onChangeText={currencyChange}
      />

      <Button 
        mode="contained" 
        style={styles.button}
        onPress={submit}
      >
        Accept
      </Button>      

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  input: {
    marginBottom: 10
  },
  button: {
    padding: 5
  }
})

export default AddPage