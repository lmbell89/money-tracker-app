import React from 'react'
import { BottomNavigation } from 'react-native-paper'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import Summary from './navPages/Summary'
import Accounts from './navPages/Accounts'
import IncomesBills from './navPages/IncomesBills'
import Spinner from './Spinner'

const BottomNav = ({ 
  navIndex, 
  setNavIndex, 
  accounts, 
  incomes, 
  bills,
  loadingSummary,
  loadingAccounts,
  loadingIncomes,
  loadingBills,
  removeAccount,
  removeIncome,
  removeBill,
  navigation,
  cycleEnd,
  editCycleEnd
}) => {
  
  const routes = [
    { 
      key: 'summary', 
      title: 'Summary', 
      icon: "speedometer" 
    },
    { 
      key: 'accounts', 
      title: 'Accounts', 
      icon: ({size, color}) => (
      <FontAwesome 
        name="bank" 
        size={size - 6} 
        style={{ color: color }} 
      />)
    },
    { 
      key: 'incomes', 
      title: 'Incomes', 
      icon: ({size, color}) => (
        <FontAwesome 
          name="dollar" 
          size={size - 6} 
          style={{ color: color }} 
        />)
    },
    { 
      key: 'bills',
      title: 'Bills', 
      icon: ({size, color}) => (
        <FontAwesome5 
          name="wallet" 
          size={size - 6} 
          style={{ color: color }} 
        />)
    },
  ]

  const renderScene = BottomNavigation.SceneMap({
    summary: () => loadingAccounts || loadingIncomes || 
      loadingBills || loadingSummary ? <Spinner/> : 
      Summary({ accounts, incomes, bills, cycleEnd, editCycleEnd }),
    accounts: () => loadingAccounts ? <Spinner/> : Accounts({ 
      items: accounts, 
      deleteFn: removeAccount, 
      navigation 
    }),
    incomes: () => loadingIncomes ? <Spinner/> : IncomesBills({ 
      items: incomes, 
      deleteFn: removeIncome, 
      navigation,
      type: 'income'
    }),
    bills: () => loadingBills ? <Spinner/> : IncomesBills({ 
      items: bills,
      deleteFn: removeBill, 
      navigation,
      type: 'bill'
    }),
  })

  return (
    <BottomNavigation
      navigationState={{ index: navIndex, routes }}
      onIndexChange={setNavIndex}
      renderScene={renderScene}
    />
  )
}

export default BottomNav