import React, { useRef, useState } from 'react';
import { Animated, View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Tab from '../../navigation/Tab'

const Like = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>관심 공구 페이지</Text>
      <Tab/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default Like
