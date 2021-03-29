import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { DefaultTheme, HelperText, TextInput } from 'react-native-paper'

const DateList = ({ cycleEnd, setCycleEnd }) => {
  const [error, setError] = useState(false)

  changeDate = (date) => {
    setCycleEnd(date)
    setError(!Number.isInteger(+date) || date < 1 || date > 31)
  }

  const getText = (date) => {
    switch (date.toString().slice(-1)) {
      case '1':
        return `${date}st of the month`
      case '2':
        return `${date}nd of the month`
      case '3':
        return `${date}rd of the month`
      default:
        return `${date}th of the month`
    }
  }

  return (
    <View>
      <TextInput
        mode="outlined"
        label="End of Cycle"
        value={cycleEnd.toString()}
        keyboardType="numeric"
        right={<TextInput.Affix text={getText(cycleEnd)} />}
        error={error}
        onChangeText={changeDate}
      />

      <HelperText type="error" visible={error}>
        Enter a number between 1 and 31
      </HelperText>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    list: {
      marginTop: 10,
      backgroundColor: '#E7E7E7',
      borderBottomColor: '#ABABAB',
      borderBottomWidth: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },
    listItem: {
      backgroundColor: DefaultTheme.colors.background,
    },
  }
)

export default DateList