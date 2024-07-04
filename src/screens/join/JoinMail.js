import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
} from 'react-native'
import Header from '../../components/Header'
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const JoinMail = ({ navigation }) => {
  const [emailId, setEmailId] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [error, setError] = useState('')
  const [isEmailRegistered, setIsEmailRegistered] = useState(false)

  // 이메일 입력 시
  const handleEmailChange = (text) => {
    const email = text.trim() // 이메일 입력 시 공백 제거
    console.log('handleEmailChange - 입력된 이메일:', email)
    setEmailId(email)
    setEmailTouched(false)
    setIsEmailRegistered(false)
    setError('')
  }

  // 이메일 중복 확인 요청
  const checkEmailExistence = async (email) => {
    try {
      console.log('checkEmailExistence - 확인할 이메일:', email)
      const response = await axios.get(`${BASE_URL}/check-email`, {
        params: { memberEmail: `${email}@yonsei.ac.kr` },
      })
      console.log('checkEmailExistence - 응답 데이터:', response.data)
      const isRegistered = response.data

      if (isRegistered) {
        console.log('checkEmailExistence - 이메일이 이미 등록됨')
        setIsEmailRegistered(true)
        setError('이미 가입된 메일입니다. 로그인해주세요!')
      } else {
        console.log('checkEmailExistence - 이메일이 등록되지 않음')
        setError('')
        // 가입되지 않은 경우, 인증 번호 발송 요청
        await sendVerificationCode(email)
      }
    } catch (error) {
      console.error('checkEmailExistence - 이메일 확인 중 오류 발생:', error)
      setError('이메일 확인 중 오류가 발생했습니다.')
    }
  }

  // 인증번호 발송 요청
  const sendVerificationCode = async (email) => {
    try {
      const formattedEmail = `${email}@yonsei.ac.kr`
      console.log(
        'sendVerificationCode - 인증번호 발송할 이메일:',
        formattedEmail
      )
      const response = await axios.post(
        `${BASE_URL}/sendVerificationCode`,
        null,
        {
          params: { memberEmail: formattedEmail },
        }
      )

      if (response.data.status === 'SUCCESS') {
        console.log('sendVerificationCode - 인증번호 발송 성공')
        navigation.navigate('JoinVerifyNumber', { email })
      } else {
        console.log('sendVerificationCode - 인증번호 발송 실패')
        setError('인증번호 발송에 실패했습니다.')
      }
    } catch (error) {
      console.error('sendVerificationCode - 인증번호 발송 실패 에러:', error)
      setError('인증번호 발송 중 오류가 발생했습니다.')
    }
  }

  // 인증하기 버튼 클릭 시
  const handleVerify = () => {
    if (emailId.trim().length > 0 && !isEmailRegistered) {
      checkEmailExistence(emailId.trim())
    }
  }

  // 입력 컨테이너 스타일 설정
  const getInputContainerStyle = () => {
    return {
      borderColor: isEmailRegistered ? '#CC0000' : '#75C743',
      backgroundColor: 'white', // 안쪽 색깔은 흰색으로 유지
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 10,
      height: 47,
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
            <Text
              style={[
                styles.label,
                { color: isEmailRegistered ? '#CC0000' : '#75C743' },
              ]}
            >
              연세메일
            </Text>
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
            ...styles.loginButton,
            backgroundColor:
              emailId.length > 0 && !isEmailRegistered ? '#75C743' : '#DEDEDE',
            opacity: emailId.length > 0 && !isEmailRegistered ? 1 : 0.5,
          }}
          onPress={handleVerify}
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
