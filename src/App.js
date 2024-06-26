import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import StackBeforeLogin from './navigation/StackBeforeLogin'
import StackAfterLogin from './navigation/StackAfterLogin'

const App = () => {
  const [userToken, setUserToken] = useState(null)

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken')
        setUserToken(token)
      } catch (error) {
        console.error('Error fetching user token:', error)
      }
    }

    checkUserToken()
  }, [])

  return (
    <NavigationContainer>
      {userToken ? <StackAfterLogin /> : <StackBeforeLogin />}
    </NavigationContainer>
  )
}

export default App
