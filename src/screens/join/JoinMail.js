import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'
import Header from '../../components/Header'

const JoinMail = ({ navigation }) => {
  const [verifMail, setVerifiMail] = useState('')
  const [error, setError] = useState('')

  const mail = ['abc', '123']

  const handleVerifiMail = (text) => {
    setVerifiMail(text)
    setError('')
  }

  const checkVerifiMail = () => {
    if (mail.includes(verifMail)) {
      setError('이미 가입된 메일주소입니다.')
    } else {
      navigation.navigate('JoinVerifyNumber', { userMail: verifMail })
    }
  }

  const getButtonStyle = () => {
    return verifMail.length > 0
      ? { ...styles.loginButton, backgroundColor: '#75C743' }
      : { ...styles.loginButton, backgroundColor: '#DEDEDE', color: 'white' }
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

      <View style={styles.mail}>
        <Text style={styles.yMail}>*연세메일</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="hello1234"
            style={styles.input}
            onChangeText={handleVerifiMail}
          />
          <Text style={styles.inputMail}> @ yonsei.ac.kr</Text>
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={getButtonStyle()} onPress={checkVerifiMail}>
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
    width: '90%',
    // marginBottom: 234,
    marginBottom: 5,
    borderBottomWidth: 2,
  },

  input: {
    height: 40,
    width: '90%',
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },

  inputMail: {
    marginLeft: -90,
    fontWeight: 'semibold',
  },

  errorText: {
    color: '#CC0000',
    marginLeft: 10,
    marginBottom: '65%',
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
    backgroundColor: '#75C743',
    borderRadius: 16,
  },
})

export default JoinMail
