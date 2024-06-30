import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import MyInfoCheck from '../screens/mypage/MyInfoCheck';
import SignOut from '../screens/mypage/SignOut';
import SignOutFinish from '../screens/mypage/SignOutFinish';
import Search from '../screens/main/Search';
import SearchResult from '../screens/main/SearchResult';
import RecruitDetails from '../screens/main/recruit/RecruitDetalis';
import Useredit from '../screens/mypage/Useredit';
import Phoneedit from '../screens/mypage/Phoneedit';
import Passwordedit from '../screens/mypage/Passwordedit';
import Editend from '../screens/mypage/Editend';
import NotificationCheck from '../screens/mypage/NotificationCheck';
import MyInfo from '../screens/mypage/MyInfo';
import FAQ from '../screens/mypage/FAQ';
import CreateGroupPurchase from '../screens/main/participate/CreateGroupPurchase';
import ParticipantInfo from '../screens/main/participate/ParticipantInfo';
import ManageMy from '../screens/main/ManageMy';

const Stack = createStackNavigator();

const StackAfterLogin = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
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
        name="Editend"
        component={Editend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationCheck"
        component={NotificationCheck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyInfo"
        component={MyInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateGroupPurchase"
        component={CreateGroupPurchase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParticipantInfo"
        component={ParticipantInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageMy"
        component={ManageMy}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackAfterLogin;
