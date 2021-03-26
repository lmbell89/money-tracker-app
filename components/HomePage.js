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
    if (!route.params) return
    const {id, name, value, period, date, type} = route.params

    if (type === 'account' && id) {
      addAccount(name, value)
    } else if (type === 'income' && id) {
      addIncome(name, value, date, period)
    } else if (type === 'bill' && id) {
      addBill(name, value, date, period)
    } else if (type === 'account') {
      editAccount(id, name, value)
    } else if (type === 'income') {
      editIncome(id, name, value, date, period)
    } else if (type === 'bill') {
      editBill(id, name, value, date, period)
    }
  })

  const navType = ['accounts', 'incomes', 'bills'][navIndex]

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

  const addIncome = (name, value, date, period) => {
    setLoadingIncomes(true)
    insertIncome(name, value, date, period)
      .finally(() => setLoadingIncomes(false))
      .then(({ insertId }) => setIncomes(
        [...incomes, { id: insertId, name, value, date, period }]
      ))
      .catch(err => setError(err))
  }

  const addBill = (name, value, date, period) => {
    setLoadingBills(true)
    insertBill(name, value, date, period)
      .finally(() => setLoadingBills(false))
      .then(({ insertId }) => setBills(
        [...bills, { id: insertId, name, value, date, period }]
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

  const editIncome = (id, name, value, date, period) => {
    setLoadingIncomes(true)
    updateIncome(id, name, value)
      .finally(setLoadingIncomes(false))
      .then(setIncomes(incomes.map(income => {
        return income.id === id ? { id, name, value, date, period } : income
      })))
      .catch(err => setError(err))
  }

  const editBill = (id, name, value, date, period) => {
    setLoadingBills(true)
    updateBill(id, name, value)
      .finally(setLoadingBills(false))
      .then(setBills(bills.map(bill => {
        return bill.id === id ? { id, name, value, date, period } : bill
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
        <AddButton navigation={navigation} navType={navType} />
        <ErrorSnack error={error} setError={setError} />
      </Portal>
    </Portal.Host>
  )
}

export default HomePage