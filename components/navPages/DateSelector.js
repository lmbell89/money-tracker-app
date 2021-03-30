import React from 'react'
import { View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'

const DateList = ({ date, setDate, error }) => {
  const getText = (n) => {
    switch (n.toString().slice(-1)) {
      case '1':
        return `${n}st of the month`
      case '2':
        return `${n}nd of the month`
      case '3':
        return `${n}rd of the month`
      default:
        return `${n}th of the month`
    }
  }

  return (
    <View>
      <TextInput
        mode="outlined"
        label="End of Cycle"
        value={date.toString()}
        keyboardType="numeric"
        right={<TextInput.Affix text={getText(date)} />}
        error={error}
        onChangeText={setDate}
      />

      <HelperText type="error" visible={error}>
        Enter a number between 1 and 31
      </HelperText>
    </View>
  )
}

export default DateList