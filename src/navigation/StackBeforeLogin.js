import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './Tab'
import MyInfoCheck from '../screens/mypage/MyInfoCheck'
import SignOut from '../screens/mypage/SignOut'
import SignOutFinish from '../screens/mypage/SignOutFinish'
import Welcome from '../screens/login/Welcome'
import Login from '../screens/login/Login'
import FindPassword from '../screens/login/FindPassword'
import VerifyNumber from '../screens/login/VerifyNumber'
import Main from '../screens/main/Main'
import ResetPassword from '../screens/login/ResetPassword'
import JoinMail from '../screens/join/JoinMail'
import JoinVerifyNumber from '../screens/join/JoinVerifyNumber'
import Useredit from '../screens/mypage/Useredit'
import Phoneedit from '../screens/mypage/Phoneedit'
import Passwordedit from '../screens/mypage/Passwordedit'
import TermsAgree from '../screens/join/TermsAgree'
import JoinWelcome from '../screens/join/JoinWelcome'
import Editend from '../screens/mypage/Editend'

import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const StackbeforeloginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
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
        name="Useredit"
        component={Useredit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Phoneedit"
        component={Phoneedit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Passwordedit"
        component={Passwordedit}
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
        name="Editend"
        component={Editend}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  )
}

export default StackbeforeloginNavigation
