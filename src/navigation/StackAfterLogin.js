import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Maintest from '../screens/main/Maintest'
import MyInfoCheck from '../screens/mypage/MyInfoCheck'
import SignOut from '../screens/mypage/SignOut'
import SignOutFinish from '../screens/mypage/SignOutFinish'
import TabNavigation from './Tab'

import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const StackAfterLoginNavigation = () => {
  return (
    // <Stack.Navigator initialRouteName="Main">
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Maintest"
        component={Maintest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyInfoCheck"
        component={MyInfoCheck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignOut"
        component={SignOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignOutFinish"
        component={SignOutFinish}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackAfterLoginNavigation
