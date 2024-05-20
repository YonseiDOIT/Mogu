import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './Tab'
import MyInfoCheck from '../screens/mypage/MyInfoCheck'
import MyInfoEdit from '../screens/mypage/MyInfoEdit'
import MyInfoEditEnd from '../screens/mypage/MyInfoEditEnd'
import SignOut from '../screens/mypage/SignOut'
import SignOutFinish from '../screens/mypage/SignOutFinish'

import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="MyInfoCheck"
        component={MyInfoCheck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyInfoEdit"
        component={MyInfoEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyInfoEditEnd"
        component={MyInfoEditEnd}
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

export default StackNavigation
