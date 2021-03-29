import React from 'react'
import { View } from 'react-native'

import Item from './Item'

const Accounts = ({ navigation, items, deleteFn }) => {
  return(
    <View style={{padding: 10}}>
      {items?.map(item => Item({...item, deleteFn, navigation, type: "account" }))}
    </View>    
  )
}

export default Accounts