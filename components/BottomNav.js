import React from 'react'
import { BottomNavigation } from 'react-native-paper'

import Accounts from './Accounts'
import Bills from './Bills'
import { deleteIncome, deleteBill } from '../db/database'

const BottomNav = ({ navIndex, setNavIndex, accounts, incomes, bills }) => {
  const routes = [
    { key: 'accounts', title: 'Accounts', icon: 'card-account-details-outline' },
    { key: 'incomes', title: 'Incomes', icon: 'history' },
    { key: 'bills', title: 'Bills', icon: 'history' },
  ]

  const renderScene = BottomNavigation.SceneMap({
    accounts: () => Accounts({ accounts }),
    incomes: () => Bills({ incomes, deleteFn: deleteIncome }),
    bills: () => Bills({ bills, deleteFn: deleteBill }),
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