import React from 'react'
import { StyleSheet } from 'react-native'
import { Snackbar, DefaultTheme } from 'react-native-paper'

const ErrorSnack = ({ error, setError }) => {
  return (
    <Snackbar visible={error} onDismiss={() => setError(null)} style={styles.snack}>
      {error.message}
    </Snackbar>
  )  
}

const styles = StyleSheet.create({
  snack: {
    backgroundColor: DefaultTheme.colors.error,
    color: DefaultTheme.colors.surface
  }
})

export default ErrorSnack