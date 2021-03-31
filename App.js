import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'

import { migrate } from './db/database'
import HomePage from './components/HomePage'
import AddPage from './components/AddPage'
import TopNav from './components/TopNav'
import Spinner from './components/Spinner'

const Stack = createStackNavigator()

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    migrate()
    .then(() => setLoaded(true))
    .catch((err) => console.log(err))
  }, [])

  const loadedContent = (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="HomePage"
          screenOptions={{header: props => TopNav(props)}}
        >
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Add" component={AddPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )

  return loaded ? loadedContent : <Spinner />
} 