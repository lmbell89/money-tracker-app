import React from 'react'
import { ScrollView } from 'react-native'

import Item from './Item'

const Recurring = ({ navigation, items, deleteFn, type }) => {
  return(
    <ScrollView>
      {items?.map(item => Item({...item, deleteFn, navigation, type }))}
    </ScrollView>    
  )
}

export default Recurring