import React from 'react'
import { StyleSheet } from 'react-native'
import { FAB, Portal } from 'react-native-paper'

const AddButton = ({ navigation, navType }) => {
  return(
    <Portal>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Add", { type: navType })}
      />
    </Portal>
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