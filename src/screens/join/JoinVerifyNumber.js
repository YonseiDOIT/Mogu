import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import axios from 'axios'
import { BASE_URL } from '../../api'

const JoinVerifyNumber = ({ navigation, route }) => {
  const { userMail } = route.params
  const [isFocused, setIsFocused] = useState(false)
  const [verifiCode, setVerifiCode] = useState('')
  const [isCodeCorrect, setIsCodeCorrect] = useState(true)

  const randomCode = '121212' // 임시 랜덤 코드

  // 인증번호 입력
  const handleVerifyCodeChange = (text) => {
    setVerifiCode(text)
    setIsCodeCorrect(true) // 인증번호 입력이 변경될 때 마다 검사
  }

  // 계속하기 버튼 클릭
  const handleContinue = () => {
    if (verifiCode === randomCode) {
      sendVerificationCode(userMail)
      navigation.navigate('Join')
    } else {
      setIsCodeCorrect(false)
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

  const sendVerificationCode = async (email) => {
    try {
      await axios.post(`${BASE_URL}/sendPwd`, { memberEmail: email })
      console.log('인증번호가 성공적으로 전송되었습니다.')
    } catch (error) {
      console.error('인증번호 전송 실패 에러:', error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header />
        <View style={styles.textContainer}>
          <Text style={styles.login}>가입하기</Text>
          <Text style={styles.description}>
            {userMail ? `${userMail} @yonsei.ac.kr` : ''} 메일을 확인해주세요!
          </Text>
        </View>

        {/* 인증번호 입력란 */}
        <View style={styles.number}>
          <View style={styles.labelContainer}>
            <Text style={[styles.verifyLabel, getLabelStyle()]}>인증번호</Text>
          </View>
          <View style={[styles.inputContainer, getInputBorderStyle()]}>
            <TextInput
              placeholder="6자리 인증번호를 입력해주세요."
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

        {/* 계속하기 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                backgroundColor:
                  verifiCode.length === 6 ? '#75C743' : '#DEDEDE',
              },
            ]}
            onPress={handleContinue}
            disabled={verifiCode.length !== 6}
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
