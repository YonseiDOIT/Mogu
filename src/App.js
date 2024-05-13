import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from '../src/navigation/StackBeforeLogin'
import { createStackNavigator } from '@react-navigation/stack'
// import styled from 'styled-components'

const Stack = createStackNavigator()

const App = () => {
  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync({
  //       'Inter-Regular': require('../src/font/Inter-Regular.ttf'),
  //     })
  //   }

  //   loadFonts()
  // }, [])

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App
