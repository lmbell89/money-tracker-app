import React from 'react'
import { View } from 'react-native'
import { Card, Title } from 'react-native-paper'
import dayjs from 'dayjs'

const Summary = ({ accounts, incomes, bills, cycleEnd }) => {
  const now = new Date()
  let endDate = dayjs(now).date(cycleEnd)

  if (cycleEnd < now.getDate()) {
    endDate = dayjs(now).add(1, 'month')
  } 
  
  const numberDue = (start, periodType) => {
    debugger
    const startDate = dayjs(start, 'YYYY-MM-DD')
    const daysUntil = startDate.diff(now, 'day')

    if (startDate > now && startDate.diff(now, 'month') >= 1) {
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

  accounts.map(account => account.value).forEach(value => {
    currentTotal += value
    cycleTotal += value
  })

  incomes.forEach(income => {
    cycleTotal += income.value * numberDue(income.date, income.period)
  })

  bills.forEach(bill => {
    cycleTotal -= bill.value * numberDue(bill.date, bill.period)
  })

  return (
    <View>
      <Card>
        <Title>Current Total</Title>
        <Title>{'£' + currentTotal.toFixed(2)}</Title>
      </Card>

      <Card>
        <Title>End of Cycle</Title>
        <Title>{'£' + cycleTotal.toFixed(2)}</Title>
      </Card>
    </View>
  )
}

export default Summary