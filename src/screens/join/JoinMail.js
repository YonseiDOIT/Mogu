import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native'
import Header from '../../components/Header'
import axios from 'axios'
import { BASE_URL } from '../../api'

const JoinMail = ({ navigation }) => {
  const [emailId, setEmailId] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [error, setError] = useState('')
  const [isEmailRegistered, setIsEmailRegistered] = useState(false)

  const handleEmailChange = (text) => {
    const trimmedEmail = text.trim() // 이메일 입력 시 공백 제거
    setEmailId(trimmedEmail)
    setEmailTouched(false)
    setIsEmailRegistered(false)
    setError('')

    // 입력된 이메일이 있을 때만 가입 여부 검사
    if (trimmedEmail.length > 0) {
      checkEmailExistence(trimmedEmail)
    }
  }

  const checkEmailExistence = async (trimmedEmail) => {
    try {
      const response = await axios.get(`${BASE_URL}/check-email`, {
        params: { memberEmail: `${trimmedEmail}@yonsei.ac.kr` },
      })
      const isRegistered = response.data

      if (isRegistered) {
        setIsEmailRegistered(true)
        setError('이미 가입된 메일입니다. 로그인해주세요!')
      } else {
        setError('')
      }
    } catch (error) {
      console.error('Failed to check email existence:', error)
      setError('이메일 확인 중 오류가 발생했습니다.')
    }
  }

  const getButtonStyle = () => {
    return emailId.length > 0 && !isEmailRegistered
      ? { ...styles.loginButton, backgroundColor: '#75C743' }
      : { ...styles.loginButton, backgroundColor: '#DEDEDE', color: 'white' }
  }

  const navigateToVerifyNumber = () => {
    if (isEmailRegistered) {
      // 이미 가입된 경우, 에러 메시지만 설정하고 넘어가지 않음
      setError('이미 가입된 메일입니다. 로그인해주세요!')
    } else {
      // 가입되지 않은 경우, 인증 번호 입력 화면으로 이동
      navigation.navigate('JoinVerifyNumber', { userMail: emailId })
    }
  }

  const getLabelStyle = () => {
    return {
      color: isEmailRegistered ? '#CC0000' : '#75C743',
    }
  }

  const getInputContainerStyle = () => {
    return {
      borderColor: isEmailRegistered ? '#CC0000' : '#75C743',
      backgroundColor: 'white', // 안쪽 색깔은 흰색으로 유지
    }
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.join}>가입하기</Text>
        <Text style={styles.description}>
          주소가 맞는지 확인하고 인증하기 버튼을 눌러주세요.
        </Text>
      </View>

      <View style={styles.mailPw}>
        <View style={[styles.inputContainer, getInputContainerStyle()]}>
          <Image
            source={require('../../assets/mail.png')}
            style={[
              styles.image,
              { display: emailTouched || emailId ? 'none' : 'flex' },
            ]}
            resizeMode="contain"
          />
          {(emailTouched || emailId) && (
            <Text style={[styles.label, getLabelStyle()]}>연세메일</Text>
          )}
          <TextInput
            placeholder="연세메일"
            style={styles.input}
            value={emailId}
            onChangeText={handleEmailChange}
            onBlur={() => {
              setEmailTouched(true)
            }}
            onFocus={() => setEmailTouched(false)}
            autoCapitalize="none"
          />
          <Text style={styles.emailFix}>@yonsei.ac.kr</Text>
        </View>
        <View style={styles.errorContainer}>
          {error !== '' && (
            <Text style={[styles.errorText, { color: '#CC0000' }]}>
              {error}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            ...getButtonStyle(),
            opacity: emailId.length === 0 || isEmailRegistered ? 0.5 : 1,
          }}
          onPress={navigateToVerifyNumber}
          disabled={emailId.length === 0 || isEmailRegistered}
        >
          <Text style={styles.buttonText}>인증하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  textContainer: {
    marginBottom: 20,
    marginTop: '30%',
    marginLeft: '8%',
  },

  join: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    marginBottom: -12,
  },

  mailPw: {
    marginBottom: '60%',
    marginLeft: '10%',
    marginRight: '10%',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 47,
  },

  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  label: {
    position: 'absolute',
    zIndex: 1,
    top: -5,
    left: 15,
    paddingHorizontal: 4,
    backgroundColor: 'white',
    fontSize: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
    padding: 10,
  },

  emailFix: {
    fontSize: 15,
    marginLeft: 8,
  },

  errorContainer: {
    marginTop: 5,
    minHeight: 20,
  },

  errorText: {
    marginLeft: 10,
  },

  buttonContainer: {
    marginBottom: 90,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
})

export default JoinMail
