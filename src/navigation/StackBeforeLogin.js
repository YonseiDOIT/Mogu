import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/login/Welcome'
import Login from '../screens/login/Login'
import FindPassword from '../screens/login/FindPassword'
import VerifyNumber from '../screens/login/VerifyNumber'
import ResetPassword from '../screens/login/ResetPassword'
import JoinMail from '../screens/join/JoinMail'
import JoinVerifyNumber from '../screens/join/JoinVerifyNumber'
import TermsAgree from '../screens/join/TermsAgree'
import JoinWelcome from '../screens/join/JoinWelcome'
import Join from '../screens/join/Join'
import Maintest from '../screens/main/Maintest'

const Stack = createStackNavigator()

const StackBeforeLogin = () => {
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
        name="Join"
        component={Join}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Maintest"
        component={Maintest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackBeforeLogin
