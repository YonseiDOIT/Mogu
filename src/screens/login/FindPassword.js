import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const FindPassword = ({ navigation }) => {
  const [userMail, setUserMail] = useState('')

  const handleContinue = async () => {
    const memberEmail = `${userMail}@yonsei.ac.kr`
    console.log('요청을 보낼 이메일:', memberEmail)

    try {
      const checkResponse = await axios.get(`${BASE_URL}/check-email`, {
        params: { memberEmail },
        withCredentials: true,
      })

      console.log('이메일 확인 응답:', checkResponse.data)

      if (checkResponse.data.exists) {
        console.log('이메일이 존재합니다. 메일 전송을 시작합니다.')

        try {
          const response = await axios.post(
            `${BASE_URL}/sendPwd`,
            { memberEmail },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          )

          console.log('메일 전송 서버 응답:', response.data)

          if (response.data.status === 'SUCCESS') {
            Alert.alert('성공', response.data.message)
            navigation.navigate('VerifyNumber', { userMail: memberEmail })
          } else {
            Alert.alert('오류', response.data.message)
          }
        } catch (sendPwdError) {
          console.error('메일 전송 실패 에러:', sendPwdError)
          Alert.alert('오류', '메일 전송 중 오류가 발생했습니다.')
        }
      } else {
        Alert.alert('오류', '가입되지 않은 메일입니다.')
      }
    } catch (error) {
      console.error('이메일 확인 요청 에러:', error)
      handleRequestError(error, memberEmail)
    }
  }

  const handleRequestError = (error, memberEmail) => {
    console.error('비밀번호 찾기 실패 에러:', error)

    if (error.response) {
      console.error('응답 데이터:', error.response.data)
      console.error('응답 상태 코드:', error.response.status)
      console.error('응답 헤더:', error.response.headers)
      console.error('요청한 이메일:', memberEmail)

      let message = '비밀번호 찾기 실패: '
      switch (error.response.status) {
        case 403:
          message += '권한이 없습니다. 올바른 이메일 주소인지 확인하세요.'
          break
        default:
          message +=
            error.response.data.message || '상세한 오류 메시지가 없습니다.'
          break
      }

      Alert.alert('오류', message)
    } else if (error.request) {
      console.error('요청 데이터:', error.request)
      Alert.alert('오류', '서버로부터 응답을 받지 못했습니다.')
    } else {
      console.error('에러 메시지:', error.message)
      Alert.alert('오류', `요청 중 에러 발생: ${error.message}`)
    }
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.findPw}>비밀번호 찾기</Text>
        <Text style={styles.description}>
          인증번호를 받을 연세메일 주소를 알려주세요.
        </Text>
      </View>

      <View style={styles.mail}>
        <Text style={styles.yMail}>연세메일</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="hello1234"
            style={styles.input}
            value={userMail}
            onChangeText={(text) => setUserMail(text)}
          />
          <Text style={styles.inputMail}>@ yonsei.ac.kr</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.contButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>인증메일 보내기</Text>
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
    marginBottom: 110,
    marginTop: '30%',
    marginLeft: '8%',
  },

  findPw: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    marginBottom: -12,
  },

  mail: {
    marginBottom: '8%',
    marginLeft: '10%',
  },

  yMail: {
    color: '#777777',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '90%',
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },

  inputMail: {
    marginLeft: -100,
    marginBottom: 10,
    fontWeight: 'semibold',
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

  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 16,
  },

  join: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 15,
  },
})

export default FindPassword
