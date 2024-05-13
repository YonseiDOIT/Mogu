import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  FontAwesome6,
  MaterialIcons,
  Feather,
  Octicons,
} from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarActiveTintColor: '#000000',
      }}
    >
      <Tab.Screen
        name="홈"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="Home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="관심 공구"
        component={Like}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="Favorite" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="공구 관리"
        component={MgmtOnGoing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="Shopping Bag" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={MyInfo}
        options={{
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
