import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, Pressable,View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LikeHeader = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.view}>
        <Pressable style={styles.backButton}>
        <Text style ={styles.headment1}>관심 공구</Text>
        </Pressable>
    </View>
  )
};
const styles = StyleSheet.create({
    view:{
        height:100,
        paddingTop: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
    },
  backButton: {
    position: 'absolute',
    marginLeft: '-3%',
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
    top:-1,
    width:200,
    left:35,
    fontSize:20
  },
    edit:{
    position: 'absolute',
    top:63,
    fontWeight:'500',
    width:100,
    right:-10,
    fontSize:17
  },
})

export default LikeHeader
