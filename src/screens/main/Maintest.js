import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import { BASE_URL } from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Maintest() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [searchText, setSearchText] = useState('')
  const [selectedSort, setSelectedSort] = useState('기한임박순')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [hasMoreData, setHasMoreData] = useState(true)
  const [storedToken, setStoredToken] = useState('')
  const [favoriteItems, setFavoriteItems] = useState([])

  useEffect(() => {
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
    if (isFocused) {
      // 화면이 포커스될 때 첫 페이지 데이터를 다시 로드
      loadFavoriteItems()
    }
  }, [isFocused])

  const loadFavoriteItems = async () => {
    try {
      const favoriteItemsString = await AsyncStorage.getItem('favoriteItems')
      const favoriteItems = favoriteItemsString
        ? JSON.parse(favoriteItemsString)
        : []
      setFavoriteItems(favoriteItems)
      updateItemsWithFavorites(favoriteItems)
    } catch (error) {
      console.error('Error loading favorite items:', error)
    } finally {
      resetAndFetchProducts()
    }
  }

  const resetAndFetchProducts = async () => {
    setPage(0)
    setItems([])
    setHasMoreData(true)
    getProducts(0)
  }

  const updateItemsWithFavorites = (favoriteItems) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        const favoriteItem = favoriteItems.find(
          (favItem) => favItem.id === item.id
        )
        return favoriteItem
          ? { ...item, favorite: true }
          : { ...item, favorite: false }
      })
    })
  }

  const getProducts = async (page) => {
    const storedToken = await AsyncStorage.getItem('token')
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        params: {
          page: page,
          size: 10,
        },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })

      const newItems = response.data.content.map((item) => {
        const favoriteItem = favoriteItems.find(
          (favItem) => favItem.id === item.id
        )
        return favoriteItem
          ? // ? { ...item, favorite: favoriteItem.favorite }
            { ...item, favorite: true }
          : { ...item, favorite: false }
      })

      if (page === 0) {
        setItems(newItems)
      } else {
        setItems((prevItems) => [...prevItems, ...newItems])
      }

      if (response.data.content.length < 8) {
        setHasMoreData(false)
      }
    } catch (error) {
      console.error('Error getProducts:', error)
    } finally {
      setLoading(false)
    }
    console.log('목록확인', items)
  }

  const handleSearchPress = () => {
    navigation.navigate('Search', { token: storedToken })
  }

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
    return totalMinutes < 1440 // 24시간 미만 (1440분)
  }

  const handleFavoriteToggle = async (itemId) => {
    const item = items.find((item) => item.id === itemId)
    if (!item) return

    const isCurrentlyFavorite = item.favorite

    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, favorite: !item.favorite } : item
    )
    setItems(updatedItems)

    const updatedFavoriteItems = updatedItems.filter((item) => item.favorite)
    setFavoriteItems(updatedFavoriteItems)

    try {
      let token = await AsyncStorage.getItem('token')
      if (!token || isTokenExpired(token)) {
        console.error('토큰이 없습니다.')
        return
      }

      console.log('토큰 확인:', token)

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      if (isCurrentlyFavorite) {
        // 현재 찜 상태인 경우, 찜 삭제 요청
        await axios.delete(`${BASE_URL}/favorite/${itemId}`, config)
        console.log('찜 삭제 성공')
      } else {
        // 현재 찜 상태가 아닌 경우, 찜 추가 요청
        await axios.post(
          `${BASE_URL}/favorite/add`,
          { productId: itemId },
          config
        )
        console.log('찜 추가 성공')
      }

      await AsyncStorage.setItem(
        'favoriteItems',
        JSON.stringify(updatedFavoriteItems)
      )
    } catch (error) {
      console.error('Error saving favorite items:', error)
      if (error.response && error.response.status === 403) {
        console.error('토큰이 없습니다.')
      }
    }
  }

  const handleScrollEnd = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
    const isBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 20

    if (isBottom && !loading && hasMoreData) {
      const nextPage = page + 1 // 다음 페이지 번호
      setPage(nextPage) // 페이지 상태 업데이트
      getProducts(nextPage) // 다음 페이지 데이터 요청
    }
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const isTokenExpired = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return decodedToken.exp < currentTime
    } catch (e) {
      console.error('Error decoding token:', e)
      return true
    }
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/m09.png')} style={styles.m09} />
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={handleSearchPress}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="내게 필요한 상품을 찾아보세요!"
            value={searchText}
            editable={false}
            pointerEvents="none"
          />
          <Image
            source={require('../../assets/search.png')}
            style={styles.searchButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.categoriesWrapper}>
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>전체</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={styles.categoryContainer}
            showsHorizontalScrollIndicator={false}
          >
            {['물 · 음료', '과일', '유제품', '건강식', '위생용품', '기타'].map(
              (category, index) => (
                <TouchableOpacity key={index}>
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>전체</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={styles.categoryContainer}
            showsHorizontalScrollIndicator={false}
          >
            {['연세플라자', '연탄불고기', '매지놀이터', '기타'].map(
              (category, index) => (
                <TouchableOpacity key={index}>
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>
      </View>
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

      <ScrollView
        style={styles.itemsContainer}
        onScroll={handleScrollEnd}
        scrollEventThrottle={400}
      >
        <View style={styles.itemsGrid}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              <TouchableOpacity
                style={styles.itemBox}
                onPress={() => navigation.navigate('RecruitDetails')}
              >
                <Image
                  source={{
                    uri: `${BASE_URL}/images/${item.productImage}`,
                  }}
                  style={styles.deadlineImage}
                />
                <TouchableOpacity
                  onPress={() => handleFavoriteToggle(item.id)}
                  style={styles.heartIconContainer}
                >
                  <Image
                    source={
                      item.favorite
                        ? require('../../assets/heart.png')
                        : require('../../assets/emptyheart.png')
                    }
                    style={styles.heartIcon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <View style={styles.timeContainer}>
                <MaterialIcons
                  name="access-time"
                  size={16}
                  color="#333"
                  style={[
                    styles.timeIcon,
                    isDeadlineSoon(item.endDate) && styles.deadlineSoonText,
                  ]}
                />
                <Text
                  style={[
                    styles.itemText,
                    isDeadlineSoon(item.endDate) && styles.deadlineSoonText,
                  ]}
                >
                  {calculateTimeRemaining(item.endDate)}
                </Text>
              </View>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <View style={styles.row}>
                <Text
                  style={styles.itemText}
                >{`수량 ${item.remainingQty}/${item.qty}`}</Text>
                <Text style={styles.itemPriceWrapper}>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </Text>
                  <Text style={styles.priceWon}> 원</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateGroupPurchase')}
      >
        <Image
          source={require('../../assets/addButton.png')}
          style={styles.addButtonImage}
        />
      </TouchableOpacity>
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

  m09: {
    width: 35,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 10,
  },

  searchContainer: {
    flex: 1,
    position: 'relative',
  },

  searchInput: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 40,
    backgroundColor: '#F3F3F3',
  },

  searchButtonContainer: {
    position: 'absolute',
  },

  searchButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    right: 10,
    top: 8,
  },

  separator: {
    height: 2,
    backgroundColor: '#F3F3F3',
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
    top: 225,
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
    marginBottom: 20,
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
    color: '#777777',
  },

  itemText: {
    marginTop: 5,
    fontSize: 12,
    color: '#777777',
  },
  deadlineSoonText: {
    color: '#F25151',
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

export default Maintest
