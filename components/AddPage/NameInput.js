import React from 'react'
import { View } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper'

const NameInput = ({ name, changeName, validName }) => {
  const display = validName ? "none" : "flex"

  return (
    <View>
      <TextInput 
        label="Name" 
        value={name}
        onChangeText={changeName}
        onBlur={() => changeName(name)}
        error={!validName}
      />
      <HelperText type="error" style={{ display }}>
        Enter a name
      </HelperText>
    </View>
  )
}

export default NameInput