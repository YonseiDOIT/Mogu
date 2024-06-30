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
      {/* <Stack.Screen
        name="RecruitDetails"
        component={RecruitDetails}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen name="RecruitDetails" options={{ headerShown: false }}>
        {(props) => (
          <RecruitDetails
            {...props}
            isRecruiting={false}
            isClosed={false}
            category="과일"
            productName="사과"
            pricePerUnit={1100}
            remainingQuantity={100}
            timeLeft="0일 1시간 0분"
            purchaseLink="https://example.com/purchase"
            isFavorite={true}
            isApplicant={true}
            applicantQuantity={5}
            hostDesiredQuantity={10}
            applicationTime={new Date().getTime() - 1800000} // 30분 전
          />
        )}
      </Stack.Screen>

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
