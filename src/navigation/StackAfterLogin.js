import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './TabNavigation'
import Maintest from '../screens/main/Maintest'
import MyInfoCheck from '../screens/mypage/MyInfoCheck'
import SignOut from '../screens/mypage/SignOut'
import SignOutFinish from '../screens/mypage/SignOutFinish'
import Search from '../screens/main/Search'
import SearchResult from '../screens/main/SearchResult'
import RecruitDetails from '../screens/main/recruit/RecruitDetalis'

const Stack = createStackNavigator()

const StackAfterLogin = () => {
  return (
    // <Stack.Navigator initialRouteName="TabNavigation">
    <Stack.Navigator initialRouteName="RecruitDetails">
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Maintest"
        component={Maintest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecruitDetails"
        component={RecruitDetails}
        options={{ headerShown: false }}
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

export default StackAfterLogin
