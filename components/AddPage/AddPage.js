import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import isCurrency from 'validator/lib/isCurrency'

import NameInput from './NameInput'
import ValueInput from './ValueInput'
import DateSelector from './DateSelector'
import PeriodList from './PeriodList'

const AddPage = ({ 
  navigation, 
  type, 
  id, 
  defaultName: name, 
  defaultValue: value,
  defaultDate: date, 
  defaultPeriod: period 
}) => {
  const [name, setName] = useState(defaultName)
  const [value, setValue] = useState(defaultValue)
  const [date, setDate] = useState(defaultDate || new Date())
  const [period, setPeriod] = useState(defaultPeriod || 'monthly')

  const [validName, setValidName] = useState(true)
  const [validValue, setValidValue] = useState(true)
  
  const submit = () => {
    if (name && validName && value && validValue) {
      navigation.navigate("HomePage", {
        id,
        name,
        value: parseFloat(value), 
        type,
        date,
        period
      })
    }
  }

  const changeName = (str) => {
    setValidName(Boolean(str))
    setName(str)
  }

  const changeValue = (value) => {
    setValue(value)
    setValidValue(
      isCurrency(value.toString(), {digits_after_decimal: [0, 1, 2]})
    )
  }

  return (
    <View style={styles.container}>
      <NameInput name={name} changeName={changeName} validName={validName} />

      <ValueInput 
        value={value} 
        changeValue={changeValue} 
        validValue={validValue} 
        label={type === 'account' ? 'Balance' : 'Amount'}
        style={styles.input}
      />

      {type === 'account' ? null :
        <DateSelector date={date} setDate={setDate} style={styles.input} />        
      }

      {type === 'account' ? null :
        <PeriodList period={period} setPeriod={setPeriod} />
      }

      <Button mode="contained" style={styles.button} onPress={submit}>
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
    marginTop: 10
  },
  button: {
    marginTop: 10,
    padding: 5
  }
})

export default AddPage