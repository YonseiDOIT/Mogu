import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Maintest from '../screens/main/Maintest'
import LikeScreen from '../screens/like/Like'
import OngoingScreen from '../screens/mogu_management/MgmtOnGoing'
import Myinfo from '../screens/mypage/MyInfo'
import { MaterialIcons, Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarActiveTintColor: '#000000',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Maintest}
        options={{
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
          title: '관심 공구',
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
          title: '공구 관리',
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
          title: '내 정보',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation
