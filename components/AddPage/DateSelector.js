import React, { useState } from 'react'
import { View } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates'
import dayjs from 'dayjs'

const DateSelector = ({ date, setDate, style }) => {
  const [open, setOpen] = useState(false)

  const selectDate = (selected) => {
    setOpen(false)
    setDate(selected)
  }

  return (
    <View>
      <TextInput
        style={style}
        right={<TextInput.Icon name="calendar" onPress={() => setOpen(true)} />}
        label="Start Date"
        editable={false}
        value={dayjs(date).format('DD/MM/YYYY')}
      />

      <DatePickerModal
        mode="single"
        visible={open}
        date={date}
        onConfirm={selectDate}
        onDismiss={() => setOpen(false)}
        saveLabel="Accept"
        label="Start Date"
      />
    </View>

  )
}

export default DateSelector