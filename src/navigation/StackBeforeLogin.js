import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './Tab'
import Welcome from '../screens/login/Welcome'
import Login from '../screens/login/Login'

import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default StackNavigation
