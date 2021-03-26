import React from 'react'
import { View } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper'

const ValueInput = ({ value, changeValue, validValue, label, style }) => {
  const display = validValue ? "none" : "flex"

  return (
    <View>
      <TextInput
        style={style}
        left={<TextInput.Affix text="£ " />}
        label={label}
        keyboardType={"numeric"}
        value={value}
        error={!validValue}
        onChangeText={changeValue}
        onBlur={() => changeValue(value)}
      />
      <HelperText type="error" style={{ display }}>
        Invalid number supplied
      </HelperText>
    </View>
  )
}

export default ValueInput