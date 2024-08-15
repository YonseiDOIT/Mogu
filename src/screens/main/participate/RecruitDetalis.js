import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import axios from 'axios'
import MapView, { Marker } from 'react-native-maps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../../../services/api'

const RecruitDetails = ({ route, navigation }) => {
  const { itemId } = route.params
  const [data, setData] = useState(null)
  const [userStatus, setUserStatus] = useState('') // Combined state variable
  const [isparticipant, setisparticipant] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentApplicantQuantity, setCurrentApplicantQuantity] = useState(0)
  const [currentIsRecruiting, setCurrentIsRecruiting] = useState(true)
  const [closeRecruitmentModalVisible, setCloseRecruitmentModalVisible] =
    useState(false)
  const [isOptionsVisible, setIsOptionsVisible] = useState(false)
  const mapRef = useRef(null)

  const [location, setLocation] = useState({
    latitude: 37.277,
    longitude: 127.9025,
    latitudeDelta: 0.0019,
    longitudeDelta: 0.0019,
  })

  useEffect(() => {
    fetchProductDetails()
    fetchisseller()
    fetchisparticipant()
  }, [])

  const fetchProductDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        throw new Error('Token is missing')
      }
      const response = await axios.get(`${BASE_URL}/products/${itemId}`, {
        params: { id: itemId },
      })
      setData(response.data)
      setLocation({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        latitudeDelta: 0.0019,
        longitudeDelta: 0.0019,
      })
    } catch (error) {
      console.error('Error fetching product details:', error)
    }
  }

  const fetchisseller = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const userId = await AsyncStorage.getItem('userId')
      if (!token) {
        throw new Error('Token is missing')
      }
      const response = await axios.get(
        `${BASE_URL}/products/${itemId}/checkSeller`,
        {
          params: { productId: itemId, sellerId: userId },
        }
      )

      const responseText = response.data.trim()
      console.log(responseText)
      console.log(itemId)
      setUserStatus(responseText)
    } catch (error) {
      console.error('Error fetching product details:', error)
      setUserStatus('none') // set to 'none' in case of error
    }
  }
  const fetchisparticipant = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await axios.get(`${BASE_URL}/participation/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { productId: itemId },
      })

      console.log(response)
      setisparticipant(response.data)
    } catch (error) {
      console.error('Error fetching participation status:', error)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const openLink = () => {
    if (data?.url) {
      Linking.openURL(data.url)
    }
  }

  const handleParticipate = () => {
    setCurrentApplicantQuantity(currentApplicantQuantity + 1)
    navigation.navigate('Participate')
  }

  const handleCancelParticipation = () => {
    setIsModalVisible(true)
  }

  const confirmCancelParticipation = () => {
    setUserStatus('none')
    setCurrentApplicantQuantity(currentApplicantQuantity - 1)
    setIsModalVisible(false)
  }

  const handleCloseRecruitment = () => {
    setCloseRecruitmentModalVisible(true)
  }

  const confirmCloseRecruitment = () => {
    setCurrentIsRecruiting(false)
    setCloseRecruitmentModalVisible(false)
  }

  const handleManageParticipants = () => {
    navigation.navigate('ParticipantInfo')
  }

  const calculateTimeRemaining = (endDate) => {
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    const totalSeconds = Math.max((end - now) / 1000, 0)

    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = Math.floor(totalSeconds % 60)

    if (days > 0) {
      return `${days}일 ${hours}시간 ${minutes}분`
    } else if (hours > 0) {
      return `${hours}시간 ${minutes}분`
    } else if (minutes > 0) {
      return `${minutes}분`
    } else {
      return `${seconds}초`
    }
  }

  const formattedPrice = data?.price ? data.price.toLocaleString() : ''
  const formattedQuantity = data?.remainingQty
    ? data.remainingQty.toLocaleString()
    : ''
  const timeLeft = data ? calculateTimeRemaining(data.endDate) : ''

  const getStatusText = () => {
    if (!data) return ''
    if (data.dealStatus === '모집중') {
      return '참여 모집 중'
    } else if (timeLeft === '0일 0시간 0분') {
      return '종료되었습니다.'
    } else {
      return '마감 후 구매 진행 중'
    }
  }

  const getStatusStyle = () => {
    if (!data) return {}
    if (data.dealStatus === '모집중') {
      return [styles.statusContainer, styles.recruitingBackground]
    } else if (timeLeft === '0일 0시간 0분') {
      return [styles.statusContainer, styles.closedBackground]
    } else {
      return [styles.statusContainer, styles.closedBackground]
    }
  }

  if (!data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../../assets/back.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${BASE_URL}/images/${data.productImage}` }}
              style={styles.image}
            />
          </View>

          <View style={getStatusStyle()}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.categoryText}>{data.category}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Image
                source={
                  isFavorite
                    ? require('../../../assets/heart.png')
                    : require('../../../assets/emptyheart.png')
                }
                style={styles.heartImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.productInfoContainer}>
            <Text style={styles.productName}>{data.name}</Text>
            <TouchableOpacity onPress={openLink}>
              <Text style={styles.linkText}>구매 링크{'>'}</Text>
            </TouchableOpacity>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.staticText}>개당</Text>
              </View>
              <Text style={[styles.dynamicText, styles.dynamic]}>
                ₩ {formattedPrice}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.staticText}>남은 개수</Text>
              </View>
              <Text style={[styles.dynamicText, styles.dynamic]}>
                {formattedQuantity}개
              </Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.staticText}>마감까지</Text>
              </View>
              <Text style={[styles.dynamicText, styles.dynamic]}>
                {timeLeft}
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View>
            <Text style={styles.announceTitle}>공지</Text>
            <Text style={styles.announce}>{data.content}</Text>
          </View>
          <MapView ref={mapRef} initialRegion={location} style={styles.map}>
            <Marker coordinate={location} />
          </MapView>
        </ScrollView>

        {userStatus === 'N' ? (
          isparticipant === 'Y' ? (
            <TouchableOpacity
              style={[styles.cancelButton]}
              onPress={handleCancelParticipation}
            >
              <Text style={styles.footerText}>참여 취소하기</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                style={[styles.participateButton]}
                onPress={handleParticipate}
              >
                <Text style={styles.footerText}>참여하기</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          currentIsRecruiting && (
            <View style={styles.hostButtonsContainer}>
              <TouchableOpacity
                style={styles.manageButton}
                onPress={handleCloseRecruitment}
              >
                <Text style={styles.manageButtonText}>모집 마감하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.manageButtonP}
                onPress={() =>
                  navigation.navigate('ParticipantInfo', { itemId: itemId })
                }
              >
                <Text style={styles.manageButtonTextP}>참여자 정보 관리</Text>
              </TouchableOpacity>
            </View>
          )
        )}

        {userStatus === 'N' && (
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>참여를 취소하시겠습니까?</Text>
              <Text style={styles.modalText}>
                해당 공동구매에 더이상 참여할 수 없습니다.{' '}
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButtonGo}
                  onPress={confirmCancelParticipation}
                >
                  <Text style={styles.modalButtonGoText}>계속하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonCancelText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        <Modal
          isVisible={closeRecruitmentModalVisible}
          onBackdropPress={() => setCloseRecruitmentModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>신청을 마감하시겠습니까?</Text>
            <Text style={styles.modalText}>
              해당 공동구매에 더이상 다른 사용자가 참여할 수 없습니다.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonGo}
                onPress={confirmCloseRecruitment}
              >
                <Text style={styles.modalButtonGoText}>마감하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setCloseRecruitmentModalVisible(false)}
              >
                <Text style={styles.modalButtonCancelText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  optionsContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  optionsButton: {
    padding: 8,
  },
  optionsButtonText: {
    fontSize: 24,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusContainer: {
    alignItems: 'center',
    padding: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  recruitingBackground: {
    backgroundColor: '#75C743',
  },
  closedBackground: {
    backgroundColor: 'gray',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#75C743',
    textDecorationLine: 'underline',
    marginTop: '5%',
  },
  heartImage: {
    resizeMode: 'contain',
    width: 22,
    height: 22,
    marginTop: '60%',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B3B3B3',
    marginTop: '1%',
    marginBottom: '8%',
  },
  productInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '4%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  infoLabelContainer: {
    width: 80,
  },
  staticText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  dynamicText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '3%',
  },
  dynamic: {
    color: '#75C743',
  },
  separator: {
    width: '120%',
    height: 17,
    marginLeft: -20,
    backgroundColor: '#F6F6F6',
    marginVertical: 2,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  participateButton: {
    borderRadius: 15,
    borderColor: '#75C743',
    backgroundColor: '#75C743',
    height: 56,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderRadius: 15,
    borderColor: '#C7434B',
    backgroundColor: '#C7434B',
    padding: 10,
    height: 56,
    width: '90%',
  },
  hostButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    bottom: 15,
  },
  manageButton: {
    backgroundColor: '#C7434B',
    borderColor: '#C7434B',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '45%',
    height: 56,
    margin: 5,
    elevation: 5,
    shadowColor: '#909090',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  manageButtonP: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '45%',
    height: 56,
    margin: 5,
    borderWidth: 2,
    borderColor: '#75C743',
    elevation: 5,
    shadowColor: '#909090',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageButtonTextP: {
    fontSize: 16,
    color: '#75C743',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#CC0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonGo: {
    borderRadius: 8,
    backgroundColor: '#C7434B',
    width: '45%',
    height: 38,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  modalButtonGoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalButtonCancel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777777',
    backgroundColor: 'white',
    width: '45%',
    height: 38,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  modalButtonCancelText: {
    color: '#9C9C9C',
    fontSize: 14,
    fontWeight: 'bold',
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  announceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '4%',
    marginLeft: 20,
  },
  announce: {
    fontSize: 16,
    marginTop: '4%',
    marginLeft: 20,
  },
})

export default RecruitDetails
