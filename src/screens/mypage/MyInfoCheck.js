import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import MyInfoHeader from '../../components/MyInfoHeader'
import Login from '../login/Login'
import SignOut from '../mypage/SignOut'
import Useredit from './Useredit'
import { RotateInDownLeft } from 'react-native-reanimated'
import { bool } from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const MyInfoCheck = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    phone: '',
    password: '',
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
          throw new Error('토큰이 없습니다.')
        }
        const response = await axios.get(`${BASE_URL}/member`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { email, nickname, phone, password } = response.data.data
        setUserInfo({ email, nickname, phone, password })
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error)
        if (error.response && error.response.status === 403) {
          // 토큰이 만료되었거나 유효하지 않은 경우 로그인 화면으로 리디렉션
          await AsyncStorage.removeItem('token')
          navigation.navigate('Login')
        }
      }
    }
    fetchUserInfo()
  }, [navigation])

  useEffect(() => {
    if (route.params?.updatedNickname) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        nickname: route.params.updatedNickname,
      }))
    }
    if (route.params?.updatedPhone) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        phone: route.params.updatedPhone,
      }))
    }
  }, [route.params?.updatedNickname, route.params?.updatedPhone])

  const onPressModalOpen = () => {
    console.log('팝업을 여는 중입니다.')
    setIsModalVisible(true)
  }

  const onPressModalClose = () => {
    setIsModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <MyInfoHeader />
      <View style={styles.textContainer}>
        <Image
          source={require('../../assets/infocheckimg.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.maininfo}>
        <View style={styles.id}>
          <Image
            source={require('../../assets/user.png')}
            style={[styles.idmail, { height: 21, top: 10 }]}
          />
          <View
            style={[styles.idinfo, { left: 15 }]}
            onPress={() => navigation.navigate('Useredit')}
          >
            <Text style={styles.usernametext}>{userInfo.nickname}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Useredit')}>
            <Image
              source={require('../../assets/infoarrow.png')}
              style={styles.infoimage}
            />
          </Pressable>
        </View>
        <View style={styles.id}>
          <Image
            source={require('../../assets/myinfoMail.png')}
            style={[styles.idmail, { height: 16, top: 15 }]}
          />
          <View style={[styles.idinfo, { left: 15 }]}>
            <Text style={[styles.usernametext, { color: '#777777' }]}>
              {userInfo.email}
            </Text>
          </View>
        </View>

        <View style={styles.id}>
          <Image
            source={require('../../assets/phone.png')}
            style={[styles.idmail, { height: 21, top: 12 }]}
          />
          <View style={[styles.idinfo, { left: 15 }]}>
            <Text style={styles.usernametext}>{userInfo.phone}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Phoneedit')}>
            <Image
              source={require('../../assets/infoarrow.png')}
              style={styles.infoimage}
            />
          </Pressable>
        </View>
        <View style={styles.id}>
          <Image
            source={require('../../assets/lock.png')}
            style={[styles.idmail, { height: 21, top: 10 }]}
          />
          <View style={[styles.idinfo, { left: 15 }]}>
            <TextInput
              style={[{ left: 10 }]}
              secureTextEntry={true}
              editable={false}
            >
              ●●●●●●●
            </TextInput>
          </View>
          <Pressable onPress={() => navigation.navigate('Passwordedit')}>
            <Image
              source={require('../../assets/infoarrow.png')}
              style={styles.infoimage}
            />
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.Pressable1} onPress={onPressModalOpen}>
        <Text>로그아웃</Text>
      </Pressable>
      <Pressable
        style={styles.Pressable2}
        onPress={() => navigation.navigate('SignOut')}
      >
        <Text>회원탈퇴</Text>
      </Pressable>
      {/* 아래는 모달 영역 */}
      <View style={{ marginTop: 400 }}>
        <Modal animationType="fade" visible={isModalVisible} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.modalTextStyle}>로그아웃</Text>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 14,
                    position: 'absolute',
                    marginTop: 28,
                  }}
                >
                  정말 로그아웃 할까요?
                </Text>
              </View>
              <View style={styles.buttonView}>
                <Pressable
                  onPress={() => {
                    onPressModalClose()
                    navigation.navigate('Login')
                  }}
                  style={styles.logoutconfirm}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>확인</Text>
                </Pressable>
                <Pressable
                  onPress={onPressModalClose}
                  style={styles.closemodal}
                >
                  <Text style={{ color: '#75C743', fontWeight: '700' }}>
                    취소
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    bottom: -15,
    marginLeft: 10,
    fontWeight: '600',
  },
  nim: {
    position: 'absolute',
    right: 10,
  },
  id: {
    flexDirection: 'row',
    borderRadius: 14,
    height: 47,
    width: '80%',
    borderColor: '#C4C4C4',
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

  // 모달 영역
  modalView: {
    marginTop: 330,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonView: {
    flexDirection: 'row',
  },
  modalTextStyle: {
    fontSize: 16,
    color: '#17191c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 45,
  },
  logoutconfirm: {
    color: 'white',
    backgroundColor: '#75C743',
    alignItems: 'center',
    justifyContent: 'center',
    width: 133,
    height: 38,
    borderRadius: 7,
    marginRight: 5,
  },
  closemodal: {
    backgroundColor: '#fff',
    borderColor: '#75C743',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 133,
    height: 38,
    borderRadius: 7,
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    alignContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})
export default MyInfoCheck
