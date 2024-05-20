import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, Pressable,View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SignOutHeader = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.view}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
            source={require('../assets/backlinearrow.png')}
            style={styles.image}
        />
        <Text style ={styles.headment1}>탈퇴하기</Text>
        </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    view:{
        height:100,
        paddingTop: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
    },
  backButton: {
    position: 'absolute',
    marginLeft: '7%',
    marginTop: '16%',
  },
  image: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  headment1:{
    position: 'absolute',
    fontWeight:'700',
    marginTop: '0%',
    width:100,
    left:40,
    fontSize:20
  },
  modify:{
    position: 'absolute',
    marginTop: '16%',
    fontWeight:'500',
    width:100,
    height:20,
    right:-10,
    fontSize:17,
  },
    edit:{
    right:-10,
    fontSize:17
  },
})

export default SignOutHeader
