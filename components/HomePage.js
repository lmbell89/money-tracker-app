import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Portal } from 'react-native-paper'

import BottomNav from './BottomNav'
import AddButton from './AddButton'
import { selectAccounts, selectBills, selectIncomes } from '../db/database'

const HomePage = ({ navigation }) => {
  const [navIndex, setNavIndex] = useState(0)
  const [accounts, setAccounts] = useState([])
  const [incomes, setIncomes] = useState([])
  const [bills, setBills] = useState([])

  const isFocused = useIsFocused()

  const display = (accounts) => {
    console.log(accounts)
    setAccounts(accounts)
  }

  useEffect(() => {
    selectAccounts(display)
    selectIncomes(setIncomes)
    selectBills(setBills)
  }, [])

  return (
    <Portal.Host>
      <BottomNav 
        navIndex={navIndex} 
        setNavIndex={setNavIndex}
        accounts={accounts}
        incomes={incomes}
        bills={bills}
      />

      <Portal>
        <AddButton navigation={navigation} />
      </Portal>
    </Portal.Host>
  )
}

export default HomePage