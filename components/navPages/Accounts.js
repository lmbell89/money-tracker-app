import React from 'react'
import { ScrollView } from 'react-native'

import Item from './Item'

const Accounts = ({ navigation, items, deleteFn }) => {
  return(
    <ScrollView>
      {items?.map(item => Item({
        ...item, 
        value: item.balance, 
        deleteFn, 
        navigation, 
        type: "account" 
      }))}
    </ScrollView>    
  )
}

export default Accounts