import React from 'react'
import { View } from 'react-native'

import Item from './Item'

const Recurring = ({ navigation, items, deleteFn, type }) => {
  return(
    <View>
      {items?.map(item => Item({...item, deleteFn, navigation, type }))}
    </View>    
  )
}

export default Recurring