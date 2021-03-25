import React from 'react'
import { BottomNavigation } from 'react-native-paper'

import Accounts from './Accounts'
import Bills from './Bills'
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

  console.log(accounts)
  console.log(loadingAccounts)

  const routes = [
    { key: 'accounts', title: 'Accounts', icon: 'card-account-details-outline' },
    { key: 'incomes', title: 'Incomes', icon: 'history' },
    { key: 'bills', title: 'Bills', icon: 'history' },
  ]

  const renderScene = BottomNavigation.SceneMap({
    accounts: () => loadingAccounts ? <Spinner/> : Accounts({ accounts, removeAccount }),
    incomes: () => loadingIncomes ? <Spinner/> : Bills({ incomes, removeAccount }),
    bills: () => loadingBills ? <Spinner/> : Bills({ bills, removeAccount }),
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