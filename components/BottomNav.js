import React from 'react'
import { BottomNavigation } from 'react-native-paper'

import Accounts from './navPages/Accounts'
import Incomes from './navPages/Incomes'
import Spinner from './Spinner'

const BottomNav = ({ 
  navIndex, 
  setNavIndex, 
  accounts, 
  incomes, 
  bills,
  loadingAccounts,
  loadingIncomes,
  loadingBills,
  removeAccount
}) => {
  
  const routes = [
    { key: 'accounts', title: 'Accounts', icon: 'card-account-details-outline' },
    { key: 'incomes', title: 'Incomes', icon: 'history' },
    { key: 'bills', title: 'Bills', icon: 'history' },
  ]

  const renderScene = BottomNavigation.SceneMap({
    accounts: () => loadingAccounts ? <Spinner/> : Accounts({ accounts, removeAccount }),
    incomes: () => loadingIncomes ? <Spinner/> : Incomes({ incomes, removeIncome }),
    bills: () => loadingBills ? <Spinner/> : Incomes({ bills, removeBill }),
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