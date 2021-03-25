import React from 'react'
import { BottomNavigation } from 'react-native-paper'

import Accounts from './Accounts'
import Bills from './Bills'

const BottomNav = ({ navIndex, setNavIndex }) => {
  const routes = [
    { key: 'accounts', title: 'Accounts', icon: 'card-account-details-outline' },
    { key: 'incomes', title: 'Incomes', icon: 'history' },
    { key: 'bills', title: 'Bills', icon: 'history' },
  ]

  const renderScene = BottomNavigation.SceneMap({
    accounts: () => Accounts({ accounts }),
    incomes: () => Bills({ incomes }),
    bills: () => Bills({ bills }),
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