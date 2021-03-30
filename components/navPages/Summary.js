import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Card, Title, Headline, Button, DefaultTheme } from 'react-native-paper'
import dayjs from 'dayjs'

import DateSelector from './DateSelector'

const numberDue = (start, periodType, cycleEnd) => {
  const now = dayjs()
  const startDate = dayjs(start, 'YYYY-MM-DD')
  const endDate = cycleEnd < now.date() ? 
    dayjs().date(cycleEnd).add(1, 'month') :
    dayjs().date(cycleEnd)

  const daysInCycle = endDate.diff(now, 'day')
  let daysUntilBill
  
  if (periodType === 'monthly') {
    const addMonth = startDate.date() <= now.date() ? 1 : 0
    const nextBill = startDate.add(addMonth, 'month')
    daysUntilBill = Math.ceil(nextBill.diff(now, 'day', true))

  } else if (periodType === 'fortnightly') {
    const fortnightsAgo = Math.floor(now.diff(startDate, 'week') / 2)
    const nextBill = startDate.add((fortnightsAgo + 1) * 2, 'week')
    daysUntilBill = Math.ceil(nextBill.diff(now, 'day', true))

  } else if (periodType === 'weekly') {
    const weeksAgo = now.diff(startDate, 'week')
    const nextBill = startDate.add(weeksAgo + 1, 'week')
    daysUntilBill = Math.ceil(nextBill.diff(now, 'day', true))

  } else if (periodType === 'daily') {
    daysUntilBill = 1
  }

  if (startDate.diff(now, 'month') >= 1) {
    return 0 
  } else if (daysUntilBill > daysInCycle) {
    return 0
  } else if (daysUntilBill === 0) {
    return 0
  }

  switch(periodType) {
    case 'monthly':
      return 1
    case 'fortnightly':
      return 1 + Math.floor((daysInCycle - daysUntilBill) / 14)
    case 'weekly':
      return 1 + Math.floor((daysInCycle - daysUntilBill) / 7)
    case 'daily':
      return daysInCycle
  }
}


const Summary = ({ accounts, incomes, bills, cycleEnd, editCycleEnd }) => {
  const [selectedDate, setSelectedDate] = useState(cycleEnd)
  const [dateValid, setDateValid] = useState(true)

  const changeDate = (date) => {
    setSelectedDate(date)
    setDateValid(Number.isInteger(+date) && date < 32 && date > 0)
  }

  const submitDate = () => {
    if (dateValid) {
      editCycleEnd(selectedDate)
    }
  }

  let currentTotal = 0
  let cycleTotal = 0

  accounts.map(account => account.balance).forEach(balance => {
    currentTotal += balance
    cycleTotal += balance
  })

  incomes.forEach(income => {
    cycleTotal += income.value * numberDue(income.date, income.period, cycleEnd)
  })

  bills.forEach(bill => {
    debugger
    cycleTotal -= bill.value * numberDue(bill.date, bill.period, cycleEnd)
  })

  return (
    <ScrollView>
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
        <DateSelector 
          date={selectedDate} 
          setDate={changeDate} 
          error={!dateValid} 
        />

        <Card.Actions>
          <Button 
            onPress={submitDate} 
            disabled={!dateValid && selectedDate !== cycleEnd}
          >
            Update
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
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