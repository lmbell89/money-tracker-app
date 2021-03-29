import React from 'react'

import Recurring from './Recurring'

const Incomes = ({ navigation, items, deleteFn }) => {
  return <Recurring 
    navigation={navigation} 
    items={items} 
    deleteFn={deleteFn} 
    type="income" 
  />
}

export default Incomes