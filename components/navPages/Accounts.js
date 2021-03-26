import React from 'react'
import { View } from 'react-native'

import Item from './Item'

const Accounts = ({ accounts, deleteAccount }) => {
  return(
    <View>
      {accounts.map(account => Item({...account, deleteAccount }))}
    </View>    
  )
}

export default Accounts