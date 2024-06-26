import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackAfterLogin from './navigation/StackAfterLogin'
import StackBeforeLogin from './navigation/StackBeforeLogin'

const App = () => {
  const userToken = true

  return (
    <NavigationContainer>
      {userToken ? <StackAfterLogin /> : <StackBeforeLogin />}
    </NavigationContainer>
  )
}

export default App
