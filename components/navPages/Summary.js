import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Title, Headline, DefaultTheme } from 'react-native-paper'
import dayjs from 'dayjs'

import DateSelector from './DateSelector'

const Summary = ({ accounts, incomes, bills }) => {
  const [cycleEnd, setCycleEnd] = useState(1)

  const now = new Date()
  let endDate = dayjs(now).date(cycleEnd)

  if (cycleEnd < now.getDate()) {
    endDate = dayjs(now).add(1, 'month')
  } 
  
  const numberDue = (start, periodType) => {
    const startDate = dayjs(start, 'YYYY-MM-DD')
    const daysUntil = startDate.diff(now, 'day')

    if (startDate.diff(now, 'month') >= 1) {
      return 0 
    } else if (daysUntil > endDate.diff(now, 'day')) {
      return 0
    } else if (daysUntil === 0) {
      return 0
    }

    switch(periodType) {
      case 'monthly':
        return 1
      case 'fortnightly':
        return Math.floor(daysUntil / 14)
      case 'weekly':
        return Math.floor(daysUntil / 7)
      case 'daily':
        return daysUntil
    }
  }

  let currentTotal = 0
  let cycleTotal = 0

  accounts.map(account => account.balance).forEach(balance => {
    currentTotal += balance
    cycleTotal += balance
  })

  incomes.forEach(income => {
    cycleTotal += income.value * numberDue(income.date, income.period)
  })

  bills.forEach(bill => {
    cycleTotal -= bill.value * numberDue(bill.date, bill.period)
  })

  return (
    <View>
      <Card style={styles.card}>
        <Title>Current Total</Title>
        <Headline style={currentTotal < 0 ? styles.redText : null}>
          {'£' + currentTotal.toFixed(2)}
        </Headline>
      </Card>

      <Card style={styles.card}>
        <Title>End of Cycle</Title>
        <Headline style={cycleTotal < 0 ? styles.redText : null}>
          {'£' + cycleTotal.toFixed(2)}
        </Headline>
      </Card>

      <Card style={styles.card}>
        <DateSelector cycleEnd={cycleEnd} setCycleEnd={setCycleEnd} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10
  },
  redText: {
    color: DefaultTheme.colors.error
  }
})

export default Summary