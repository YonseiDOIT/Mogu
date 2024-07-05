import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import Header from '../../components/Header'
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const JoinVerifyNumber = ({ navigation, route }) => {
  const { email } = route.params
  const [isFocused, setIsFocused] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeCorrect, setIsCodeCorrect] = useState(true)
  const [error, setError] = useState('')

  // 인증번호 입력
  const handleVerifyCodeChange = (text) => {
    setVerificationCode(text)
    setIsCodeCorrect(true) // 인증번호 입력이 변경될 때마다 검사
  }

  // 계속하기 버튼 클릭
  const handleContinue = async () => {
    try {
      // 서버에 인증번호 확인 요청 보내기
      const response = await axios.post(`${BASE_URL}/verifyCode`, {
        email: `${email}@yonsei.ac.kr`,
        code: verificationCode,
      })

      // 서버에서 받은 응답 확인
      console.log('서버 응답:', response.data)

      if (response.data.status === 'SUCCESS') {
        // 인증번호 일치 시, 다음 화면으로 이동
        navigation.navigate('Join', { email: memberEmail })
      } else {
        setIsCodeCorrect(false)
        // setError('올바르지 않은 인증번호입니다.')
      }
    } catch (error) {
      console.error('인증번호 확인 실패 에러:', error)
      setIsCodeCorrect(false)
      setError('인증번호 확인 중 오류가 발생했습니다.')
      Alert.alert('오류', '인증번호 확인 중 문제가 발생했습니다.')
    }
  }

  // 입력 테두리 및 label 색상
  const getInputBorderStyle = () => {
    return {
      borderColor: isFocused
        ? isCodeCorrect
          ? '#75C743'
          : '#CC0000'
        : '#D9D9D9',
    }
  }

  const getLabelStyle = () => {
    return {
      color: isFocused ? (isCodeCorrect ? '#75C743' : '#CC0000') : '#777777',
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header />
        <View style={styles.textContainer}>
          <Text style={styles.login}>가입하기</Text>
          <Text style={styles.description}>
            {email}@yonsei.ac.kr 메일을 확인해주세요!
          </Text>
        </View>

        {/* 인증번호 입력란 */}
        <View style={styles.number}>
          <View style={styles.labelContainer}>
            <Text style={[styles.verifyLabel, getLabelStyle()]}>인증번호</Text>
          </View>
          <View style={[styles.inputContainer, getInputBorderStyle()]}>
            <TextInput
              placeholder="인증번호를 입력해주세요."
              style={styles.input}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="numeric"
              onChangeText={handleVerifyCodeChange}
            />
          </View>
          {!isCodeCorrect && (
            <Text style={styles.errorMessage}>
              올바르지 않은 인증번호입니다.
            </Text>
          )}
        </View>

        {/* 에러 메시지 */}
        {error !== '' && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: '#CC0000' }]}>
              {error}
            </Text>
          </View>
        )}

        {/* 계속하기 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                backgroundColor:
                  verificationCode.length === 10 ? '#75C743' : '#DEDEDE',
              },
            ]}
            onPress={handleContinue}
            disabled={verificationCode.length !== 10}
          >
            <Text style={styles.buttonText}>계속하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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

  login: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    marginBottom: -12,
  },

  number: {
    marginBottom: '8%',
    marginLeft: '10%',
  },

  labelContainer: {
    position: 'absolute',
    zIndex: 1,
    top: -5,
    left: 15,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
  },

  verifyLabel: {
    color: '#777777',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    width: '90%',
  },

  input: {
    height: 47,
    width: '100%',
    paddingHorizontal: 10,
  },

  errorMessage: {
    color: '#CC0000',
    marginTop: 5,
    marginLeft: 10,
  },

  buttonContainer: {
    marginTop: '81.5%',
    alignItems: 'center',
  },

  loginButton: {
    marginTop: 10,
    marginBottom: 15,
    height: 47,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default JoinVerifyNumber
