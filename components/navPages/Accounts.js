import React from 'react'
import { View } from 'react-native'

import Item from './Item'

const Accounts = ({ navigation, items, deleteFn }) => {
  return(
    <View>
      {items?.map(item => Item({...item, value: item.balance, deleteFn, navigation, type: "account" }))}
    </View>    
  )
}

export default Accounts