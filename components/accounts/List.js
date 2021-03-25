import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

import { selectAccounts } from '../db/Database'
import Item from './Item'

const List = ({ isFocused }) => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    if (isFocused) {
      selectAccounts(setAccounts)
    }
  }, [])

  return (
    <View>
      {accounts?.map(account => Item(account))}
    </View>
  )
}

export default List