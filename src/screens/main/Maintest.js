import React, { useRef, useState } from 'react';
import { Animated, View, Text,Image, TouchableOpacity, StyleSheet,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  FontAwesome6,
  MaterialIcons,
  Feather,
  Octicons,
} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

function Maintest() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
        screenOptions={{
          tabBarInactiveTintColor: '#BDBDBD',
          tabBarActiveTintColor: '#000000',
        }}
      >
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
              <MaterialIcons name="home" size={size} color={color} />
          ),
        headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={LikeScreen}
        options={{
          title: '관심',
          tabBarIcon: ({color, size}) => (
              <Feather name="favorite" size={size} color={color} />
          ),
        headerShown: false,

        }}
      />
      <Tab.Screen
        name="Notification"
        component={OngoingScreen}
        options={{
          title: '참여',
          tabBarIcon: ({color, size}) => (
              <FontAwesome6 name="Shopping Bag" size={size} color={color} />
          ),
            headerShown: false,
        }}
      />
      <Tab.Screen
        name="Message"
        component={Myinfo}
        options={{
          title: '마이',
          tabBarIcon: ({color, size}) => (
              <Octicons name="person" size={size} color={color} />
          ),
            headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>홈 화면</Text>
    </View>
  );
}

function LikeScreen() {
  return <Text>관심 공구 화면</Text>;
}

function OngoingScreen() {
  return <Text>진행중인 공구화면</Text>;
}

function Myinfo() {
  return <Text>내 정보 화면</Text>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default Maintest;