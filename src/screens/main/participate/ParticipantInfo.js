import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import InfoManageHeader from '../../../components/InfoManageHeader'
import CheckBox from 'react-native-check-box'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../../../services/api'

const ParticipantInfo = ({ route }) => {
  useEffect(() => {
    fetchparticipantlist()
  }, [])

  const { itemId } = route.params
  const [participants, setParticipants] = useState([]) // 초기 상태를 빈 배열로 설정

  const fetchparticipantlist = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await axios.get(`${BASE_URL}/participation/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { productId: itemId },
      })
      console.log(response.data)
      setParticipants(response.data)
    } catch (error) {
      console.error('Error fetching participation status:', error)
    }
  }

  const [infoVisible, setInfoVisible] = useState(false)

  const handleCheck = (id) => {
    setParticipants((prevState) =>
      prevState.map((participant) =>
        participant.id === id
          ? { ...participant, checked: !participant.checked }
          : participant
      )
    )
  }

  // participants가 undefined가 아닌지 확인 후 reduce 사용
  const totalAmount =
    participants?.reduce((sum, participant) => sum + participant.price, 0) || 0

  // participants가 undefined가 아닌지 확인 후 length 사용
  const totalParticipants = participants?.length || 0

  const showInfo = () => {
    setInfoVisible(true)
    setTimeout(() => {
      setInfoVisible(false)
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <InfoManageHeader showInfo={showInfo} />
      <ScrollView style={styles.mainview}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { marginLeft: 25 }]}>이름</Text>
          <Text style={[styles.headerText, { marginLeft: 10 }]}>참여개수</Text>
          <Text style={[styles.headerText, { marginRight: 15 }]}>참여금액</Text>
        </View>
        {participants?.map((participant) => (
          <View
            key={participant.id}
            style={[
              styles.participantRow,
              participant.checked && styles.checkedRow,
            ]}
          >
            <CheckBox
              isChecked={participant.checked}
              onClick={() => handleCheck(participant.id)}
              checkBoxColor="#000"
            />
            <Text style={styles.participantText}>
              {participant.memberNickname}
            </Text>
            <Text style={styles.participantText}>
              {participant.quantity} 개
            </Text>
            <Text style={styles.participantText}>{participant.price} 원</Text>
            <TouchableOpacity onPress={() => alert(participant.memberphone)}>
              <Image
                source={require('../../../assets/infophone.png')}
                style={styles.phoneIcon}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          총 {totalAmount} 원 / {totalParticipants} 명
        </Text>
      </View>
      {infoVisible && (
        <View style={styles.infoPopup}>
          <Text style={styles.infoText}>
            우측의 전화 아이콘을 누르면 참여자의 연락처를 볼 수 있어요.
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainview: {
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#00B812',
    borderBottomWidth: 1,
    height: 40,
  },
  headerText: {
    flex: 1,
    top: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  participantRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  checkedRow: {
    backgroundColor: '#e0e0e0',
  },
  participantText: {
    flex: 1,
    textAlign: 'center',
  },
  phoneIcon: {
    width: 15,
    height: 23,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderColor: '#48BD00',
    borderRadius: 15,
    borderWidth: 1,
    bottom: 20,
    margin: 15,
  },
  footerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#48BD00',
    fontSize: 17,
  },
  infoPopup: {
    position: 'absolute',
    top: 80,
    width: 200,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    zIndex: 1,
  },
  infoText: {
    fontSize: 14,
  },
})

export default ParticipantInfo
