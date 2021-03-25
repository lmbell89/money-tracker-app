import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'

import { migrate } from './db/database'
import HomePage from './components/HomePage'
import AddPage from './components/AddPage'
import TopNav from './components/TopNav'

const Stack = createStackNavigator()

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    migrate()
    setLoaded(true)
  }, [])

  const loadedContent = (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="HomePage"
          screenOptions={{header: props => TopNav(props)}}
        >
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="AddAccount" component={AddPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )

  return loaded ? loadedContent : null
} 