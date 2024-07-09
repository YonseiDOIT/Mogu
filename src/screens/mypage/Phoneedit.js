import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native'
import PhoneEditHeader from '../../components/PhoneEditHeader'
import { Phone } from '@mui/icons-material'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const Phoneedit = ({ navigation }) => {
  const [phone, setPhone] = useState('')
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const formatPhoneNumber = (text) => {
    // 숫자만 남기고 입력된 문자열을 필터링
    const cleaned = text.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/)
    if (match) {
      setPhone(`${match[1]}-${match[2]}-${match[3]}`)
      setIsButtonDisabled(false)
      setMessage('')
    } else {
      setPhone(text)
      setIsButtonDisabled(true)
      setMessage('ex) 010-1234-1234')
    }
  }

  const updatePhoneNumber = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        throw new Error('토큰이 없습니다.')
      }
      const response = await axios.put(
        `${BASE_URL}/member/update-phone`,
        null,
        {
          params: {
            phone,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data.status === 'SUCCESS') {
        navigation.navigate('Editend', { updatedPhone: phone })
      }
    } catch (error) {
      console.error('전화번호를 업데이트하는 중 오류가 발생했습니다:', error)
      setMessage('전화번호 업데이트에 실패했습니다.')
    }
  }

  return (
    <View style={styles.container}>
      <PhoneEditHeader />
      <View style={styles.mail}>
        <View
          style={[
            styles.id,
            nickname.length === 0 ? styles.normalborder : styles.successborder,
          ]}
        >
          <Image
            source={require('../../assets/phone.png')}
            style={[styles.idmail, { height: 21, top: 12 }]}
          />
          <View style={[styles.idinfo, { left: 15 }]}>
            <TextInput
              style={styles.usernametext}
              placeholder="전화번호를 입력하세요"
              value={phone}
              onChangeText={formatPhoneNumber}
              editable={true}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text
          style={[
            styles.overlapped,
            phone.length > 0 && !/^010-\d{4}-\d{4}$/.test(phone)
              ? styles.error
              : styles.success,
          ]}
        >
          {message}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.contButton,
            isButtonDisabled ? styles.disabledButton : null,
          ]}
          onPress={updatePhoneNumber}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>수정하기</Text>
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
  mail: {
    marginTop: 180,
  },
  idmail: {
    width: 30,
    resizeMode: 'contain',
    marginLeft: 10,
    top: 1,
  },
  infoimage: {
    width: 20,
    height: 12,
    resizeMode: 'contain',
    marginLeft: -30,
    bottom: -15,
  },
  image: {
    marginTop: -30,
    width: '80%',
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: -50,
  },
  maininfo: {
    height: '40%',
    paddingTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  username: {
    flexDirection: 'row',
    width: '50%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 40,
    marginLeft: '10%',
  },
  usernametext: {
    marginLeft: 10,
    fontWeight: '600',
  },
  id: {
    flexDirection: 'row',
    borderRadius: 14,
    height: 47,
    width: '80%',
    borderWidth: 1,
    marginBottom: 21,
    marginLeft: '10%',
  },
  idinfo: {
    flexDirection: 'row',
    width: '88%',
    marginLeft: 0,
  },
  Pressable1: {
    marginTop: 25,
    marginLeft: 15,
  },
  Pressable2: {
    marginTop: 15,
    marginLeft: 15,
  },
  buttonContainer: {
    marginTop: '81.5%',
    alignItems: 'center',
  },
  contButton: {
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
  disabledButton: {
    backgroundColor: '#C4C4C4',
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  overlapped: {
    fontSize: 12,
    marginTop: -10,
    marginLeft: 40,
  },
  error: {
    color: 'red',
  },
  success: {
    color: '#4EAA16',
  },
  normalborder: {
    borderColor: '#C4C4C4',
  },
  errorborder: {
    borderColor: 'red',
  },
  successborder: {
    borderColor: '#4EAA16',
  },
  join: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 15,
  },
})

export default Phoneedit
