import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackBeforeLogin from '../src/navigation/StackBeforeLogin'
import StackAfterLogin from '../src/navigation/StackAfterLogin'

import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'

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
      <StackAfterLogin />
    </NavigationContainer>
  )
}

export default App
