import React from 'react'
import { View } from 'react-native'

import Item from './Item'

const Incomes = ({ items, deleteItem }) => {
  return(
    <View>
      {items.map(item => Item({...item, deleteItem }))}
    </View>    
  )
}

export default Incomes