import React, { useState, useContext } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native' // AsyncStorage 추가
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import { AuthContext } from '../../App' // AuthContext 임포트
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [loginError, setLoginError] = useState('')

  const { setIsLoggedIn } = useContext(AuthContext) // AuthContext 사용

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const checkEmail = (inputEmail) => {
    // 이메일 형식 검사 정규식
    const emailPattern = /^[a-zA-Z0-9._-]+$/
    const isValid = emailPattern.test(inputEmail)
    setIsEmailValid(isValid)
  }

  const checkPassword = (inputPassword) => {
    // 비밀번호 길이 검사
    const isValid = inputPassword.length >= 7
    setIsPasswordValid(isValid)
  }

  const handleLogin = async () => {
    checkEmail(email)
    checkPassword(password)

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(`${BASE_URL}/sign-in`, {
          email: `${email}@yonsei.ac.kr`,
          password: password,
        })
        console.log('로그인 응답:', response.data) // 응답 데이터 로그 추가
        if (response.data.success) {
          // 토큰 저장
          await AsyncStorage.setItem('token', response.data.token)
          setIsLoggedIn(true)
          navigation.navigate('Maintest') // 로그인 성공 후 이동할 화면
        } else {
          setLoginError('이메일 또는 비밀번호가 일치하지 않습니다.')
        }
      } catch (error) {
        console.error('로그인 중 오류가 발생했습니다:', error)
        if (error.response) {
          console.error('응답 데이터:', error.response.data) // 오류 응답 데이터 로그 추가
          console.error('응답 상태 코드:', error.response.status) // 응답 상태 코드 로그 추가
          console.error('응답 헤더:', error.response.headers) // 응답 헤더 로그 추가
        }
        setLoginError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.textContainer}>
        <Text style={styles.login}>로그인</Text>
        <Text style={styles.description}>
          공구하고 경제적인 매지리 생활하세요!
        </Text>
      </View>
      <View style={styles.mailPw}>
        <View
          style={[
            styles.inputContainer,
            !isEmailValid && styles.invalidInputContainer,
            emailTouched &&
              (isEmailValid
                ? styles.validInputContainer
                : styles.invalidInputContainer),
          ]}
        >
          <Image
            source={require('../../assets/mail.png')}
            style={[styles.image, { display: emailTouched ? 'none' : 'flex' }]}
            resizeMode="contain"
          />
          {(emailTouched || email) && (
            <Text
              style={[
                styles.label,
                { color: isEmailValid ? '#75C743' : '#CC0000' },
              ]}
            >
              연세메일
            </Text>
          )}
          <TextInput
            placeholder="연세메일"
            style={[
              styles.input,
              { borderColor: isEmailValid ? '#75C743' : '#CC0000' },
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              setEmailTouched(true)
              checkEmail(text)
            }}
            onBlur={() => {
              checkEmail(email)
              setEmailTouched(false)
            }}
            onFocus={() => setEmailTouched(true)}
          />
          <Text style={styles.emailFix}>@yonsei.ac.kr</Text>
        </View>
        {!isEmailValid && (
          <Text style={styles.errorText}>올바른 이메일 형식이 아닙니다.</Text>
        )}
      </View>
      <View style={styles.mailPw}>
        <View
          style={[
            styles.inputContainer,
            !isPasswordValid && styles.invalidInputContainer,
            passwordTouched &&
              (isPasswordValid
                ? styles.validInputContainer
                : styles.invalidInputContainer),
          ]}
        >
          <Image
            source={require('../../assets/pw.png')}
            style={[
              styles.image,
              { display: passwordTouched ? 'none' : 'flex' },
            ]}
            resizeMode="contain"
          />
          {(passwordTouched || password) && (
            <Text
              style={[
                styles.label,
                { color: isPasswordValid ? '#75C743' : '#CC0000' },
              ]}
            >
              비밀번호
            </Text>
          )}
          <TextInput
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry={!showPassword}
            style={[
              styles.input,
              { borderColor: isPasswordValid ? '#75C743' : '#CC0000' },
            ]}
            value={password}
            onChangeText={(text) => {
              setPassword(text)
              setPasswordTouched(true)
              checkPassword(text)
            }}
            onBlur={() => {
              checkPassword(password)
              setPasswordTouched(false)
            }}
            onFocus={() => setPasswordTouched(true)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                showPassword
                  ? require('../../assets/pw_show.png')
                  : require('../../assets/pw_nshow.png')
              }
              style={styles.pwshow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {!isPasswordValid && (
          <Text style={styles.errorText}>
            비밀번호는 최소 7자 이상이어야 합니다.
          </Text>
        )}
      </View>
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
      <View style={styles.lostPw}>
        <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
          <Text style={styles.lostPwtext}>비밀번호를 잊었나요?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButton,
            !(isEmailValid && isPasswordValid) && { backgroundColor: '#ccc' },
          ]}
          onPress={handleLogin}
          disabled={!(isEmailValid && isPasswordValid)}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noAccount}>
        <Text>아직 계정이 없나요?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('JoinMail')}>
          <Text style={styles.join}>가입하기</Text>
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
  login: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: -12,
  },
  mailPw: {
    marginBottom: '8%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#D9D9D9',
    paddingHorizontal: 10,
    height: 47,
  },
  validInputContainer: {
    borderColor: '#75C743',
  },
  invalidInputContainer: {
    borderColor: '#CC0000',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  emailFix: {
    fontSize: 15,
    marginLeft: 8,
  },
  pwshow: {
    width: 24,
    height: 24,
  },
  label: {
    position: 'absolute',
    top: -5,
    left: 15,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
  },
  lostPw: {
    marginLeft: '10%',
    marginTop: -14,
  },
  lostPwtext: {
    textDecorationLine: 'underline',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: '10%',
  },
  buttonContainer: {
    marginTop: '58%',
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
  errorText: {
    fontSize: 12,
    color: '#CC0000',
    marginLeft: 10,
    marginTop: 6,
  },
})

export default Login
