import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import UserEditHeader from '../../components/UserEditHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const Useredit = ({ navigation }) => {
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    checkToken()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      checkToken()
    }, [])
  )

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token')
      console.log('토큰 확인:', storedToken)

      if (storedToken) {
        setAuthToken(storedToken)
      } else {
        console.log('토큰이 없습니다.')
        // 토큰이 없을 때 처리
      }
    } catch (error) {
      console.error('토큰 읽기 오류:', error)
    }
  }

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const lengthcheck = (text) => {
    setNickname(text)
    if (text.length === 0) {
      setMessage('')
      setIsButtonDisabled(true)
    } else if (text.length < 5) {
      setMessage('닉네임은 5자리 이상이어야 합니다.')
      setIsButtonDisabled(true)
    } else {
      setMessage('')
      setIsButtonDisabled(false)
    }
  }

  const overlapcheck = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token')
      console.log('버튼 눌렀을 때 토큰 확인:', storedToken)

      if (!storedToken) {
        throw new Error('토큰이 없습니다.')
      }

      const response = await axios.put(
        `${BASE_URL}/member/update-nickname`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )

      console.log('서버 응답 데이터:', response.data)

      if (response.status === 200) {
        if (response.data.status === 'SUCCESS') {
          navigation.navigate('MyInfoCheck')
        } else {
          throw new Error(
            response.data.message || '닉네임 변경에 실패했습니다.'
          )
        }
      } else {
        throw new Error('서버 오류')
      }
    } catch (error) {
      console.error('닉네임 변경 중 오류가 발생했습니다:', error)
      handleErrorResponse(error)
    }
  }

  const handleErrorResponse = async (error) => {
    if (error.response) {
      console.log('서버 응답 데이터:', error.response.data)
      if (error.response.status === 403) {
        Alert.alert('권한 오류', '닉네임 변경 권한이 없습니다.')
      } else {
        Alert.alert(
          '오류',
          error.response.data.message ||
            '오류가 발생했습니다. 다시 시도해주세요.'
        )
      }
    } else if (error.request) {
      console.error('요청이 전송되었으나 응답이 없습니다:', error.request)
      Alert.alert('오류', '서버 응답이 없습니다. 인터넷 연결을 확인해주세요.')
    } else {
      console.error('요청 설정 중 오류가 발생했습니다:', error.message)
      Alert.alert(
        '오류',
        '요청 설정 중 오류가 발생했습니다. 다시 시도해주세요.'
      )
    }

    if (error.message === '토큰이 없습니다.') {
      Alert.alert('인증 오류', '인증이 만료되었습니다. 다시 로그인해주세요.')
      await AsyncStorage.removeItem('token')
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container}>
      <UserEditHeader />
      <View style={styles.mail}>
        <View
          style={[
            styles.id,
            nickname.length === 0
              ? styles.normalborder
              : nickname.length < 5
              ? styles.errorborder
              : styles.successborder,
          ]}
        >
          <Image
            source={require('../../assets/user.png')}
            style={[styles.idmail, { height: 21, top: 10 }]}
          />
          <View style={[styles.idinfo, { left: 15 }]}>
            <TextInput
              style={styles.usernametext}
              placeholder="닉네임을 입력하세요."
              value={nickname}
              onChangeText={lengthcheck}
              editable={true}
            />
          </View>
        </View>
        <Text
          style={[
            styles.overlapped,
            nickname.length < 5 ? styles.error : styles.success,
          ]}
        >
          {message}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.contButton,
            isButtonDisabled ? styles.disabledButton : null,
          ]}
          onPress={overlapcheck}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>수정하기</Text>
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
  mail: {
    marginTop: 180,
  },
  idmail: {
    width: 30,
    resizeMode: 'contain',
    marginLeft: 10,
    top: 1,
  },
  infoimage: {
    width: 20,
    height: 12,
    resizeMode: 'contain',
    marginLeft: -30,
    bottom: -15,
  },
  image: {
    marginTop: -30,
    width: '80%',
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: -50,
  },
  maininfo: {
    height: '40%',
    paddingTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  username: {
    flexDirection: 'row',
    width: '50%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 40,
    marginLeft: '10%',
  },
  usernametext: {
    marginLeft: 10,
    fontWeight: '600',
  },
  id: {
    flexDirection: 'row',
    borderRadius: 14,
    height: 47,
    width: '80%',
    borderWidth: 1,
    marginBottom: 21,
    marginLeft: '10%',
  },
  idinfo: {
    flexDirection: 'row',
    width: '88%',
    marginLeft: 0,
  },
  Pressable1: {
    marginTop: 25,
    marginLeft: 15,
  },
  Pressable2: {
    marginTop: 15,
    marginLeft: 15,
  },
  buttonContainer: {
    marginTop: '81.5%',
    alignItems: 'center',
  },
  contButton: {
    marginTop: 10,
    marginBottom: 15,
    height: 47,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75C743',
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#C4C4C4',
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  overlapped: {
    fontSize: 12,
    marginTop: -10,
    marginLeft: 40,
  },
  error: {
    color: 'red',
  },
  success: {
    color: '#4EAA16',
  },
  normalborder: {
    borderColor: '#C4C4C4',
  },
  errorborder: {
    borderColor: 'red',
  },
  successborder: {
    borderColor: '#4EAA16',
  },
  join: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 15,
  },
})

export default Useredit
