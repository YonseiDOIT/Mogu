import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import FinishedMyHeader from '../../components/FinishedMyHeader'

const FinishedMy = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('ongoing') // 'ongoing' or 'participated'
  const [myOngoingGroupBuys, setMyOngoingGroupBuys] = useState([])

  const fetchOngoingGroupBuys = async () => {
    const storedToken = await AsyncStorage.getItem('token')
    try {
      const response = await axios.get(
        `${BASE_URL}/products/seller/completed`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      setMyOngoingGroupBuys(response.data) // 데이터를 상태에 저장
    } catch (err) {
      console.error('Error getProducts:', err)
    }
  }

  const [myParticipatedGroupBuys, setMyParticipatedGroupBuys] = useState([])
  // const participatedGroupBuys = [
  //   {
  //     id: 1,
  //     image: '/mnt/data/image.png',
  //     status: '종료',
  //     title: '(참여한) 비건 대체육 부산물고기까스',
  //     quantity: 1,
  //     totalPrice: 12900,
  //     location: '연세플라자',
  //   },
  //   {
  //     id: 2,
  //     image: '/mnt/data/image.png',
  //     status: '취소',
  //     title: '(참여한) 비건 대체육 부산물고기까스',
  //     quantity: 1,
  //     totalPrice: 12900,
  //     location: '연세플라자',
  //   },
  // ];
  const fetchMyParticipatedGroupBuys = async () => {
    const storedToken = await AsyncStorage.getItem('token')
    try {
      const response = await axios.get(`${BASE_URL}/participation/completed`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      setMyParticipatedGroupBuys(response.data) // 데이터를 상태에 저장
    } catch (err) {
      console.error('Error getProducts:', err)
    }
  }

  useEffect(() => {
    fetchOngoingGroupBuys()
    fetchMyParticipatedGroupBuys()
  }, [])

  const renderGroupBuys = (groupBuys) => {
    return groupBuys.map((item) => (
      <View key={item.id} style={styles.productCard}>
        <Image
          source={{
            uri: `${BASE_URL}/images/${item.productImage}`,
          }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text
            style={
              item.status === '종료'
                ? styles.statusCompleted
                : styles.statusCancelled
            }
          >
            {item.status}
          </Text>
          <Text style={styles.title}>{item.name}</Text>
          {item.mqq ? (
            <Text style={styles.minQuantity}>최소 수량 {item.mqq}개</Text>
          ) : (
            <Text style={styles.quantity}>
              {item.participate_qty}개 ・ 총 {item.participate_price}원
            </Text>
          )}
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      <FinishedMyHeader />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'ongoing' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('ongoing')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'ongoing' && styles.activeTabText,
            ]}
          >
            내가 진행한 공구
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'participated' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('participated')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'participated' && styles.activeTabText,
            ]}
          >
            내가 참여한 공구
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          {selectedTab === 'ongoing'
            ? renderGroupBuys(myOngoingGroupBuys)
            : renderGroupBuys(myParticipatedGroupBuys)}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 15,
    marginLeft: 10,
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#77c146',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#77c146',
  },
  tabText: {
    fontSize: 14,
    color: '#77c146',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  statusCompleted: {
    color: 'green',
    marginBottom: 4,
  },
  statusCancelled: {
    color: 'red',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  minQuantity: {
    marginBottom: 4,
  },
  quantity: {
    marginBottom: 4,
  },
  location: {
    color: '#555',
  },
})

export default FinishedMy
