import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import axios from 'axios'
import { BASE_URL } from '../../services/api'
import SignOutHeader from '../../components/SignOutHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignOut = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        throw new Error('토큰이 없습니다.')
      }

      const userInfo = await axios.get(`${BASE_URL}/member`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { email, nickname, phone, password } = userInfo.data.data

      const response = await axios.delete(`${BASE_URL}/member`, {
        params: {
          email: email,
          nickname: nickname,
          phone: phone,
          password: password,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.status === 'SUCCESS') {
        await AsyncStorage.removeItem('token')
        navigation.reset({
          index: 0,
          routes: [{ name: 'StackBeforeLogin', screen: 'Login' }],
        })
      } else {
        Alert.alert('탈퇴 실패', '다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Error during sign out:', error)
      Alert.alert('오류', '네트워크 오류가 발생했습니다.')
    }
  }

  return (
    <View style={styles.container}>
      <SignOutHeader />
      <View style={styles.textContainer}>
        <Text style={styles.resetPw}>나의첫09님,</Text>
        <Text style={styles.resetPw}>정말로 모구를 떠나실 건가요?</Text>
        <Text style={styles.description}>
          계정을 삭제하면 참여 공구, 관심 공구, 내가 주최한 공구를 포함한 모든
          활동 정보가 삭제되고 삭제된 정보는 다시 복구할 수 없습니다.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.back} onPress={handleSignOut}>
          <Text style={styles.buttonText}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    marginTop: '15%',
    marginLeft: '8%',
  },
  resetPw: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    width: '90%',
    marginTop: 10,
    fontSize: 15,
    marginBottom: -12,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 480,
  },
  back: {
    marginTop: -40,
    height: 47,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#75C743',
    borderWidth: 1,
    borderRadius: 16,
  },
  buttonText: {
    color: '#75C743',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default SignOut
