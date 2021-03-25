import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Portal } from 'react-native-paper'

import BottomNav from './BottomNav'
import AddButton from './AddButton'
import ErrorSnack from './ErrorSnack'
import { 
  deleteAccount, 
  deleteIncome, 
  deleteBill,
  insertAccount,
  insertIncome,
  insertBill, 
  selectAccounts, 
  selectBills, 
  selectIncomes,
  updateAccount,
  updateIncome,
  updateBill,
} from '../db/database'

const HomePage = ({ route, navigation }) => {
  const [navIndex, setNavIndex] = useState(0)
  const [accounts, setAccounts] = useState([])
  const [incomes, setIncomes] = useState([])
  const [bills, setBills] = useState([])
  const [loadingAccounts, setLoadingAccounts] = useState(false)
  const [loadingIncomes, setLoadingIncomes] = useState(false)
  const [loadingBills, setLoadingBills] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    getAccounts()
    getIncomes()
    getBills()
  }, [])

  useFocusEffect(() => {
    if (route.params?.type === 'account') {
      addAccount(route.params.name, route.params.balance)
    } else if (route.params?.type === 'account') {
      addIncome(route.params.name, route.params.value)
    } else if (route.params?.type === 'account') {
      addBill(route.params.name, route.params.value)
    }
    route.params = null
  })

  const getAccounts = () => {
    setLoadingAccounts(true)
    selectAccounts()
      .finally(() => setLoadingAccounts(false))
      .then(({ rows: { _array }}) => setAccounts(_array))
      .catch(err => setError(err))      
  }

  const getIncomes = () => {
    setLoadingIncomes(true)
    selectIncomes()
      .finally(() => setLoadingIncomes(false))
      .then(({ rows: { _array }}) => setIncomes(_array))
      .catch(err => setError(err))
  }

  const getBills = () => {
    setLoadingBills(true)
    selectBills()
      .finally(() => setLoadingBills(false))
      .then(({ rows: { _array }}) => setBills(_array))
      .catch(err => setError(err))
  }
  
  const removeAccount = (id) => {
    setLoadingAccounts(true)
    deleteAccount(id)
      .finally(() => setLoadingAccounts(false))
      .then(setAccounts(accounts.filter(account => account.id !== id)))
      .catch(err => setError(err))
  }

  const removeIncome = (id) => {
    setLoadingIncomes(true)
    deleteIncome(id)
      .finally(() => setLoadingIncomes(false))
      .then(setIncomes(income.filter(income => income.id !== id)))
      .catch(err => setError(err))
  }

  const removeBill = (id) => {
    setLoadingBills(true)
    deleteBill(id)
      .finally(() => setLoadingBills(false))
      .then(setBills(bills.filter(bills => bills.id !== id)))
      .catch(err => setError(err))
  }

  const addAccount = (name, balance) => {
    setLoadingAccounts(true)
    insertAccount(name, balance)
      .finally(() => setLoadingAccounts(false))
      .then(({ insertId }) => setAccounts(
        [...accounts, { id: insertId, name, balance }]
      ))
      .catch(err => setError(err))
  }

  const addIncome = (name, value) => {
    setLoadingIncomes(true)
    insertIncome(name, value)
      .finally(() => setLoadingIncomes(false))
      .then(({ insertId }) => setIncomes(
        [...incomes, { id: insertId, name, value }]
      ))
      .catch(err => setError(err))
  }

  const addBill = (name, value) => {
    setLoadingBills(true)
    insertBill(name, value)
      .finally(() => setLoadingBills(false))
      .then(({ insertId }) => setBills(
        [...bills, { id: insertId, name, value }]
      ))
      .catch(err => setError(err))
  }

  const editAccount = (id, name, value) => {
    setLoadingAccounts(true)
    updateAccount(id, name, value)
      .finally(setLoadingAccounts(false))
      .then(setAccounts(accounts.map(account => {
        return account.id === id ? { id, name, value } : account
      })))
      .catch(err => setError(err))
  }

  const editIncome = (id, name, value) => {
    setLoadingIncomes(true)
    updateIncome(id, name, value)
      .finally(setLoadingIncomes(false))
      .then(setIncomes(incomes.map(income => {
        return income.id === id ? { id, name, value } : income
      })))
      .catch(err => setError(err))
  }

  const editBill = (id, name, value) => {
    setLoadingBills(true)
    updateBill(id, name, value)
      .finally(setLoadingBills(false))
      .then(setBills(bills.map(bill => {
        return bill.id === id ? { id, name, value } : bill
      })))
      .catch(err => setError(err))
  }

  return (
    <Portal.Host>
      <BottomNav 
        navIndex={navIndex} 
        setNavIndex={setNavIndex}
        accounts={accounts}
        incomes={incomes}
        bills={bills}
        loadingAccounts={loadingAccounts}
        loadingIncomes={loadingIncomes}
        loadingBills={loadingBills}
        removeAccount={removeAccount}
        removeIncome={removeIncome}
        removeBill={removeBill}
        editAccount={editAccount}
        editIncome={editIncome}
        editBill={editBill}
      />

      <Portal>
        <AddButton navigation={navigation} addAccount={addAccount} />
        <ErrorSnack error={error} setError={setError} />
      </Portal>
    </Portal.Host>
  )
}

export default HomePage