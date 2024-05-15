import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import ResetPassword from '../login/ResetPassword'
import { func } from 'prop-types'

const VerifyNumber = ({ navigation, route }) => {
  const { userMail } = route.params
  const [isFocused, setIsFocused] = useState(false)
  const [verifiCode, setVerifiCode] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  //   const [randomCode, setRandomCode] = useState(generateRandomCode())

  // 랜덤 코드 6자리
  //   const generateRandomCode = () => {
  //     return Math.floor(100000 + Math.random() * 900000).toString()
  //   }

  const randomCode = '121212'

  // 인증번호 입력
  const handleVeifiCodeChange = (text) => {
    setVerifiCode(text)
  }

  // 인증번호 확인
  const checkVerifiCode = () => {
    // const randomCode = generateRandomCode()

    // if (verifiCode === randomCode) {
    if (verifiCode === randomCode) {
      navigation.navigate('ResetPassword')
    } else {
      setModalVisible(true)
    }
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
            onPress={checkVerifiCode}
            disabled={verifiCode.length !== 6}
          >
            <Text style={styles.buttonText}>계속하기</Text>
          </TouchableOpacity>
        </View>

        {/* 인증 실패 */}
        <Modal
          // animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(true)
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modal}>
              <Text style={styles.modalText}>
                올바르지 않은 인증번호입니다.
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.newMail}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.newMailText}>새 메일 보내기</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5',
  },

  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: '70%',
    height: '16%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  newMail: {
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    backgroundColor: '#75C743',
    borderRadius: 8,
    width: 110,
  },

  cancel: {
    alignItems: 'center',
    padding: 10,
    borderColor: '#75C743',
    borderWidth: 1,
    borderRadius: 8,
    width: 110,
  },

  newMailText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  cancelText: {
    color: '#75C743',
    fontWeight: 'bold',
    fontSize: '14',
  },
})
export default VerifyNumber
