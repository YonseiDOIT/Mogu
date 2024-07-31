import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LikeHeader from '../../components/LikeHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../../services/api'

const Like = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [selectedSort, setSelectedSort] = useState('기한임박순')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   setItems((prevItems) => {
    //     return prevItems.map((item) => {
    //       const newTime = Math.max(parseInt(item.time, 10) - 1, 0).toString()
    //       return { ...item, time: newTime }
    //     })
    //   })
    // }, 1000) // 1초마다 업데이트

    // return () => clearInterval(intervalId)
    const intervalId = setInterval(() => {
      setItems((prevItems) => {
        return prevItems.map((item) => {
          const newTime = calculateTimeRemaining(item.endDate)
          return { ...item, time: newTime }
        })
      })
    }, 1000) // 1초마다 업데이트

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token')
        const userNickName = await AsyncStorage.getItem('userNickName')
        console.log(storedToken)
        if (!storedToken) {
          console.log('토큰이 없습니다.')
        }

        const response = await axios.get(
          `${BASE_URL}/favorite/user/${userNickName}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )
        const data = response.data.map((favorite) => ({
          product: { favid: favorite.id, ...favorite.product, fav: true },
        }))
        setItems(data)
        console.log('찜 확인', items)
      } catch (error) {
        console.error('아이템 불러오기 에러:', error.message)
        Alert.alert('오류 발생', '아이템을 불러오는 중 오류가 발생했습니다.')
      }
    }
    const unsubscribe = navigation.addListener('focus', () => {
      // 화면이 focus될 때마다 데이터를 다시 가져옴
      fetchFavoriteItems()
    })
  }, [])

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const selectSortOption = (option) => {
    setSelectedSort(option)
    setDropdownVisible(false)
  }

  const formatTime = (time) => {
    const totalSeconds = parseInt(time, 10)

    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = totalSeconds % 60

    if (days > 0) {
      return `${days}일 ${hours}시간 ${minutes}분`
    } else if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${seconds}초`
    } else if (minutes > 0) {
      return `${minutes}분 ${seconds}초`
    } else {
      return `${seconds}초`
    }
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
      return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`
    } else if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${seconds}초`
    } else if (minutes > 0) {
      return `${minutes}분 ${seconds}초`
    } else {
      return `${seconds}초`
    }
  }

  const isDeadlineSoon = (time) => {
    const totalSeconds = parseInt(time, 10)
    const totalMinutes = totalSeconds / 60
    return totalMinutes < 1440 // 24시간 미만
  }

  const handleFavoriteToggle = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, favorite: !item.favorite } : item
    )
    setItems(updatedItems)
  }

  const formatPrice = (price) => {
    return price.toLocaleString()
  }

  return (
    <View style={styles.screenContainer}>
      <LikeHeader />
      <View style={styles.separator} />
      <View style={styles.sortWrapper}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>{selectedSort}</Text>
          <Image
            source={require('../../assets/dropdown.png')}
            style={[
              styles.sortButtonIcon,
              dropdownVisible && styles.sortButtonIconInverted,
            ]}
          />
        </TouchableOpacity>
      </View>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => selectSortOption('기한임박순')}>
            <Text
              style={[
                styles.dropdownItem,
                selectedSort === '기한임박순' && styles.dropdownSelected,
              ]}
            >
              기한임박순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectSortOption('추천순')}>
            <Text
              style={[
                styles.dropdownItem,
                selectedSort === '추천순' && styles.dropdownSelected,
              ]}
            >
              추천순
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.itemsContainer}>
        <View style={styles.itemsGrid}>
          {items.map((item) => (
            <View key={item.product.favid} style={styles.itemWrapper}>
              {/* {isDeadlineSoon(item.product.endDate) && (
                <Image
                  source={{
                    uri: `${BASE_URL}/images/${item.product.productImage}`,
                  }}
                  style={[
                    styles.deadlineImage,
                    // { width: '100%', height: '71%' },
                  ]}
                />
              )} */}
              <TouchableOpacity
                style={styles.itemBox}
                onPress={() => navigation.navigate('CreateGroupPurchase')}
              >
                <Image
                  source={{
                    uri: `${BASE_URL}/images/${item.productImage}`,
                  }}
                  style={styles.deadlineImage}
                />
                <TouchableOpacity
                  onPress={() => handleFavoriteToggle(item.product.favid)}
                  style={styles.heartIconContainer}
                >
                  <Image
                    source={
                      item.product.fav
                        ? require('../../assets/heart.png')
                        : require('../../assets/emptyheart.png')
                    }
                    style={styles.heartIcon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <View style={styles.timeContainer}>
                <Text style={styles.itemText}>
                  {calculateTimeRemaining(item.product.endDate)}
                </Text>
                <MaterialIcons
                  name="access-time"
                  size={16}
                  color="#333"
                  style={styles.timeIcon}
                />
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.row}>
                <Text
                  style={styles.itemText}
                >{`수량 ${item.product.remainingQty}/${item.product.qty}`}</Text>
                <Text style={styles.itemPrice}>{`${formatPrice(
                  item.product.price
                )} 원`}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 50,
    height: 60,
  },

  separator: {
    marginTop: 20,
    height: 2,
    backgroundColor: '#fff',
  },

  categoriesWrapper: {
    marginTop: 10,
  },

  fixedButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  categoryContainer: {
    flexDirection: 'row',
  },

  categoryButton: {
    backgroundColor: '#75C743',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: '4%',
    marginLeft: '3%',
    marginBottom: 5,
    height: 30,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  categoryText: {
    alignSelf: 'center',
    marginRight: 15,
    marginBottom: 5,
    fontSize: 16,
    color: '#777777',
  },

  sortWrapper: {
    paddingHorizontal: 15,
    position: 'relative',
    width: '100%',
    alignItems: 'flex-end',
    zIndex: 2,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '22%',
    marginRight: '8%',
  },

  sortButtonText: {
    fontSize: 16,
    color: '#777777',
  },

  sortButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  sortButtonIconInverted: {
    transform: [{ rotate: '180deg' }],
  },

  dropdown: {
    position: 'absolute',
    top: 145,
    right: 0,
    marginRight: '8%',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '28%',
    zIndex: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  dropdownItem: {
    margin: 7,
    marginLeft: 15,
    fontSize: 16,
    color: '#777777',
  },

  dropdownSelected: {
    color: '#75C743',
    fontWeight: 'bold',
  },

  itemsContainer: {
    flex: 1,
  },

  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },

  itemWrapper: {
    width: '48%',
    marginBottom: 15,
  },

  itemBox: {
    width: '100%',
    height: 170,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  heartIconContainer: {
    position: 'absolute',
    top: '105%',
    right: 5,
  },
  heartIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    marginTop: 5,
  },

  itemText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333333',
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  itemPrice: {
    fontSize: 16,
    color: '#75C743',
    fontWeight: 'bold',
    marginTop: 5,
  },

  priceWon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  addButton: {
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 0,
    right: '5%',
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  addButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  deadlineImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius: 10,
  },
})

export default Like
