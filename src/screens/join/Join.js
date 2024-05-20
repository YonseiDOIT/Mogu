import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'

const Join = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const formatPhoneNumber = (input) => {
    const value = input.replace(/\D/g, '') // 숫자가 아닌 문자열 모두 제거
    const formattedValue = value
      .replace(/(\d{3})(\d{1,4})(\d{1,4})/, '$1-$2-$3') // 숫자를 전화번호 형식으로 변환
      .replace(/(-\d{4})\d+?$/, '$1') // 네 번째 그룹 이후의 문자열 삭제
    return formattedValue
  }

  const handlePhoneNumberChange = (input) => {
    const formattedPhoneNumber = formatPhoneNumber(input)
    setPhoneNumber(formattedPhoneNumber)
  }

  const handlePasswordChange = (text) => {
    setPassword(text)
    if (text.length === 0) {
      setMessage('')
    } else if (text.length < 7) {
      setMessage('비밀번호는 7자리 이상이어야 합니다.')
    } else {
      setMessage('알맞은 비밀번호입니다 :)')
    }
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.join}>가입하기</Text>
        <Text style={styles.description}>잘 하고 있어요!</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.nickName}>*닉네임</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="한글 및 숫자 10자 이하"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.nickName}>*전화번호</Text>
        <TextInput
          placeholder="010-1234-5678"
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange} // 입력할 때마다 호출
          keyboardType="numeric"
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.nickName}>*비밀번호</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
        />
        {message ? (
          <Text
            style={[
              styles.message,
              password.length < 7 ? styles.error : styles.success,
            ]}
          >
            {message}
          </Text>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.essential}>
          <Text style={styles.textEssential}>필수</Text>
          <View style={styles.space} />
          <TouchableOpacity onPress={() => navigation.navigate('TermsAgree')}>
            <Text style={styles.joinIt}>
              개인정보 제공 및 서비스 이용약관 동의
            </Text>
          </TouchableOpacity>
          <View style={styles.spaceCheck} />

          <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
            <Image
              source={
                isChecked
                  ? require('../../../src/assets/checkBoxChecked.png')
                  : require('../../../src/assets/checkBoxUnchecked.png')
              }
              style={styles.checkbox}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.joinCon}
            onPress={() => navigation.navigate('JoinWelcome')}
          >
            <Text style={styles.buttonText}>가입하기</Text>
          </TouchableOpacity>
        </View>
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
  join: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: -12,
  },
  form: {
    marginBottom: '8%',
    marginLeft: '10%',
    position: 'relative',
  },
  nickName: {
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
  },

  buttonContainer: {
    justifyContent: 'flex-end',
    marginTop: '8%',
    alignItems: 'center',
  },
  joinButton: {
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
  essential: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 10,
    marginTop: '4.5%',
    fontSize: 16,
  },
  textEssential: {
    fontWeight: 'bold',
  },

  checkbox: {
    width: 20,
    height: 20,
  },

  space: {
    width: 10,
  },
  spaceCheck: {
    width: 20,
  },
  joinIt: {
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  joinCon: {
    marginTop: 10,
    marginBottom: 15,
    height: 47,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75C743',
    borderRadius: 16,
  },

  message: {
    position: 'absolute',
    // marginTop: 10,
    fontSize: 14,
    bottom: -18,
  },
  error: {
    color: 'red',
    marginTop: -2,
    marginLeft: 10,
  },
  success: {
    color: '#4EAA16',
    marginTop: -2,
    marginLeft: 10,
  },
})

export default Join
