import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { List, DefaultTheme } from 'react-native-paper'

const PeriodList = ({ period, setPeriod }) => {
  const [listOpen, setListOpen] = useState(false)

  selectItem = (item) => {
    setListOpen(false)
    setPeriod(item)
  }

  const periods = ['monthly', 'fortnightly', 'weekly', 'daily']
  const setCaps = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <List.Accordion
      title={setCaps(period)}
      description='Time Period'
      expanded={listOpen}
      onPress={() => setListOpen(!listOpen)}
      style={styles.list}
    >
      {periods.map(item => {
        return (
          <List.Item 
            style={styles.listItem}
            title={setCaps(item)} 
            key={item} 
            onPress={() => selectItem(item)} 
          />
        )
      })}
    </List.Accordion>
  )
}

const styles = StyleSheet.create(
  {
    list: {
      marginTop: 10,
      backgroundColor: '#E7E7E7',
      borderBottomColor: '#ABABAB',
      borderBottomWidth: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },
    listItem: {
      backgroundColor: DefaultTheme.colors.background,
    },
  }
)

export default PeriodList