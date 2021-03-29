import React from 'react'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'

const AddButton = ({ navigation, type }) => {
  return(
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => navigation.navigate("Add", { type })}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 32,
    bottom: 80,
  },
})

export default AddButton