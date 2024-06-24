import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import Maintest from '../screens/main/Maintest'
import LikeScreen from '../screens/like/Like'
import OngoingScreen from '../screens/mogu_management/MgmtOnGoing'
import Myinfo from '../screens/mypage/MyInfo'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#BDBDBD',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Maintest}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Like"
        component={LikeScreen}
        options={{
          tabBarLabel: '관심 공구',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ongoing"
        component={OngoingScreen}
        options={{
          tabBarLabel: '공구 관리',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-bag" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={Myinfo}
        options={{
          tabBarLabel: '내 정보',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation
