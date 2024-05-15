import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import ResetPassword from '../login/ResetPassword'

const VerifyNumber = ({ navigation, route }) => {
  const { userMail } = route.params
  const [isFocused, setIsFocused] = useState(false)
  const [verifiCode, setVerifiCode] = useState('')

  // 인증번호 입력
  const handleVeifiCodeChange = (text) => {
    setVerifiCode(text)
  }

  // 계속하기
  const getButtonStyle = () => {
    return verifiCode.length === 6
      ? { ...styles.loginButton, backgroundColor: '#75C743' }
      : { ...styles.loginButton, backgroundColor: '#DEDEDE', color: 'white' }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header />
        <View style={styles.textContainer}>
          <Text style={styles.login}>비밀번호 찾기</Text>
          <Text style={styles.description}>
            {userMail ? `${userMail}@yonsei.ac.kr` : ''} 메일을 확인해주세요.
          </Text>
        </View>

        <View style={styles.mail}>
          <Text
            style={[
              styles.mailPassword,
              { color: isFocused ? '#75C743' : '#DEDEDE' },
            ]}
          >
            *인증번호
          </Text>
          <View
            style={[
              styles.inputContainer,
              { borderBottomColor: isFocused ? '#75C743' : 'black' },
            ]}
          >
            <TextInput
              placeholder="6자리 숫자를 입력해주세요."
              style={styles.input}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="numeric"
              onChangeText={handleVeifiCodeChange}
            ></TextInput>
            <Text style={styles.emailFix}></Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={getButtonStyle()}
            onPress={() => navigation.navigate('ResetPassword')}
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

  mail: {
    marginBottom: '8%',
    marginLeft: '10%',
  },

  mailPassword: {
    color: '#777777',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    width: '90%',
  },

  input: {
    height: 40,
    width: '90%',
    paddingHorizontal: 10,
  },

  emailFix: {
    marginLeft: -100,
    marginBottom: 10,
    fontWeight: 'semibold',
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

export default VerifyNumber
