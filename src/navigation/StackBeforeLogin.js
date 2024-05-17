import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './Tab'
import Welcome from '../screens/login/Welcome'
import Login from '../screens/login/Login'
import FindPassword from '../screens/login/FindPassword'
import VerifyNumber from '../screens/login/VerifyNumber'
import ResetPassword from '../screens/login/ResetPassword'
import Main from '../screens/main/Main'
import JoinMail from '../screens/join/JoinMail'
import JoinVerifyNumber from '../screens/join/JoinVerifyNumber'
import Join from '../screens/join/Join'

import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyNumber"
        component={VerifyNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinMail"
        component={JoinMail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinVerifyNumber"
        component={JoinVerifyNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation
