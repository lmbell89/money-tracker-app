import React from 'react'
import { Appbar } from 'react-native-paper'

const TopNav = ({ navigation, previous }) => {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Money Tracker" />
    </Appbar.Header>
  )
}

export default TopNav