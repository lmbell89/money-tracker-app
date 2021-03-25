import React from 'react'
import { Snackbar } from 'react-native-paper'

const ErrorSnack = ({ error, setError }) => {
  return (
    <Snackbar visible={error} onDismiss={() => setError(null)}>
      {error}
    </Snackbar>
  )  
}

export default ErrorSnack