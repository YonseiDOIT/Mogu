import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './Tab'
import Welcome from '../screens/login/Welcome'
import Login from '../screens/login/Login'
import FindPassword from '../screens/login/FindPassword'
import VerifyNumber from '../screens/login/VerifyNumber'
import Main from '../screens/main/Main'
import ResetPassword from '../screens/login/ResetPassword'
import TermsAgree from '../screens/join/TermsAgree'
import JoinWelcome from '../screens/join/JoinWelcome'

import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    // <Stack.Navigator initialRouteName="Main">
    <Stack.Navigator>
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
        name="TermsAgree"
        component={TermsAgree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinWelcome"
        component={JoinWelcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation
