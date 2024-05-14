import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'

const Login = ({ navigation }) => {
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
        <Text style={styles.mailPassword}>연세메일</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="hello1234" style={styles.input}></TextInput>
          <Text style={styles.emailFix}>@ yonsei.ac.kr</Text>
        </View>
      </View>
      <View style={styles.mailPw}>
        <Text style={styles.mailPassword}>비밀번호</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
        ></TextInput>
      </View>

      <View style={styles.lostPw}>
        <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
          <Text style={styles.lostPwtext}>비밀번호를 잊었나요?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noAccount}>
        <Text>아직 계정이 없나요?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Join')}>
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
  },

  mailPassword: {
    color: '#777777',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  lostPw: {
    marginLeft: '10%',
    marginTop: -14,
  },

  lostPwtext: {
    textDecorationLine: 'underline',
    fontSize: 12,
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

  emailFix: {
    marginLeft: -100,
    marginBottom: 10,
    fontWeight: 'semibold',
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
})

export default Login
