import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackbeforeloginNavigation from '../src/navigation/StackBeforeLogin'
import StackafterloginNavigation from '../src/navigation/StackAfterLogin'


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
      <StackbeforeloginNavigation />
    </NavigationContainer>
  )
}

export default App
