import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, Pressable,View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const UserInfoHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.view}>
        <View style={styles.backButton}>
            <Text style ={styles.headment1}>나의첫09</Text>
            <Pressable onPress={() => navigation.navigate('MyInfoCheck')}>
            <Image 
                source={require('../assets/setting.png')}
                style={styles.image}
            />
            </Pressable>
        </View>
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
    marginLeft:'90%',
    resizeMode: 'contain',
  },
  headment1:{
    position: 'absolute',
    fontWeight:'700',
    marginTop: '0%',
    width:500,
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

export default UserInfoHeader
