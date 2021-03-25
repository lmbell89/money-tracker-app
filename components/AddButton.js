import React from 'react'
import { StyleSheet } from 'react-native'
import { FAB, Portal } from 'react-native-paper'

const AddButton = ({ navigation }) => (
  <Portal>
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => navigation.navigate("AddAccount")}
    />
  </Portal>
)

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 32,
    bottom: 80,
  },
})

export default AddButton