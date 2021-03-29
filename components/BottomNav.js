import React from 'react'
import { BottomNavigation } from 'react-native-paper'

import Summary from './navPages/Summary'
import Accounts from './navPages/Accounts'
import Incomes from './navPages/Incomes'
import Bills from './navPages/Bills'
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
  removeAccount,
  removeIncome,
  removeBill,
  navigation
}) => {
  
  const routes = [
    { key: 'summary', title: 'Summary', icon: 'history' },
    { key: 'accounts', title: 'Accounts', icon: 'card-account-details-outline' },
    { key: 'incomes', title: 'Incomes', icon: 'history' },
    { key: 'bills', title: 'Bills', icon: 'history' },
  ]

  const accountsPage = Accounts({ items: accounts, deleteFn: removeAccount, navigation })
  const incomesPage = Incomes({ items: incomes, deleteFn: removeIncome, navigation })
  const billsPage = Bills({ items: bills, deleteFn: removeBill, navigation })

  const renderScene = BottomNavigation.SceneMap({
    summary: () => loadingAccounts || loadingIncomes || loadingBills ? <Spinner/> : 
      Summary({ accounts, incomes, bills, cycleEnd: 1 }),
    accounts: () => loadingAccounts ? <Spinner/> : accountsPage,
    incomes: () => loadingIncomes ? <Spinner/> : incomesPage,
    bills: () => loadingBills ? <Spinner/> : billsPage,
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