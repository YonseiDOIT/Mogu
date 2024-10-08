import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
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
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [favoriteItems, setFavoriteItems] = useState([])
  const [hasMoreData, setHasMoreData] = useState(true)
  const [storedToken, setStoredToken] = useState('')
  const [noResults, setNoResults] = useState(false)

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
      getProducts(page, selectedCategory, selectedLocation)
    } catch (error) {
      console.error('Error loading favorite items:', error)
    }
  }

  const updateItemsWithFavorites = (favoriteItems) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        favorite: favoriteItems.some((favItem) => favItem.id === item.id),
      }))
    )
  }

  const resetAndFetchProducts = async () => {
    setPage(0)
    setItems([])
    setHasMoreData(true)
    setNoResults(false)
    getProducts(0, selectedCategory, selectedLocation)
  }

  const getProducts = async (page, category = '', location = '') => {
    console.log(
      `Fetching products with page=${page}, category=${category}, location=${location}`
    )

    const storedToken = await AsyncStorage.getItem('token')
    if (!storedToken) {
      console.error('No token found')
      return
    }

    if (!hasMoreData) return

    setLoading(true)

    try {
      const url = `${BASE_URL}/products/filter`
      const params = {
        page: page,
        size: 10,
        category: category || undefined,
        location: location || undefined,
        keyword: searchText,
      }

      console.log('Request Params:', params)

      // if (selectedSort === '기한임박순') {
      //   url = `${BASE_URL}/products/search/end-date`
      // } else if (selectedSort === '추천순') {
      //   url = `${BASE_URL}/products/search/recommend`
      // }

      // if (category || location) {
      //   params = {
      //     ...params,
      //     category: category,
      //     location: location,
      //   }
      // }

      // console.log('Request URL:', url)
      // console.log('Request Params:', params)

      const response = await axios.get(url, {
        params: params,
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })

      console.log('Response Data:', response.data)

      // const newItems = response.data.content.map((item) => {
      //   const favoriteItem = favoriteItems.find(
      //     (favItem) => favItem.id === item.id
      //   )
      //   return favoriteItem
      //     ? { ...item, favorite: true }
      //     : { ...item, favorite: false }
      // })
      const newItems = response.data.content
        .map((item) => ({
          ...item,
          favorite: favoriteItems.find((favItem) => favItem.id === item.id),
        }))
        .filter((item) => {
          const timeRemaining = calculateTimeRemaining(item.endDate)
          return (
            timeRemaining.days !== 0 ||
            timeRemaining.hours !== 0 ||
            timeRemaining.minutes !== 0 ||
            timeRemaining.seconds !== 0
          )
        }) // 0일 0시간 0분 0초인 itemBox는 안 보이게 함

      setItems((prevItems) =>
        page === 0 ? newItems : [...prevItems, ...newItems]
      )
      setHasMoreData(newItems.length >= 10)
      setNoResults(newItems.length === 0)

      // 아이템의 만료 시간 계산 및 필터링
      const filteredItems = newItems.filter((item) => {
        const { days, hours, minutes, seconds } = calculateTimeRemaining(
          item.endDate
        )
        return days > 0 || hours > 0 || minutes > 0 || seconds > 0
      })

      if (page === 0) {
        setItems(newItems)
      } else {
        setItems((prevItems) => [...prevItems, ...newItems])
      }

      if (response.data.content.length < 10) {
        setHasMoreData(false)
      }

      // 결과가 없을 때
      if (newItems.length === 0) {
        setNoResults(true)
      } else {
        setNoResults(false)
      }
    } catch (error) {
      console.error('Error getProducts:', error)
    }
  }

  const selectCategory = (category) => {
    setSelectedCategory(category)
    setPage(0)
    // setItems([])
    setHasMoreData(true)
    setNoResults(false)
    console.log('카테고리:', category)
    setTimeout(() => {
      getProducts(0, category, selectedLocation)
    }, 0)
  }

  const selectLocation = (location) => {
    setSelectedLocation(location)
    setPage(0)
    // setItems([])
    setHasMoreData(true)
    setNoResults(false)
    console.log('장소:', location)
    setTimeout(() => {
      getProducts(0, selectedCategory, location)
    }, 0)
  }

  const resetFilters = () => {
    setSelectedCategory('')
    setSelectedLocation('')
    setPage(0)
    setHasMoreData(true)
    setNoResults(false)
    getProducts(0)
  }

  useEffect(() => {
    if (selectedCategory || selectedLocation) {
      getProducts(page, selectedCategory, selectedLocation)
    }
  }, [selectedCategory, selectedLocation, page])

  const handleSearchPress = () => {
    navigation.navigate('Search', { token: storedToken })
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const selectSortOption = (option) => {
    setSelectedSort(option)
    setDropdownVisible(false)

    // 선택된 정렬 옵션에 따라 데이터를 다시 가져옴
    resetAndFetchProducts()
  }

  useEffect(() => {
    resetAndFetchProducts()
  }, [])

  const calculateTimeRemaining = (endDate) => {
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    const totalSeconds = Math.max((end - now) / 1000, 0)

    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = Math.floor(totalSeconds % 60)

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const isDeadlineSoon = (endDate) => {
    const { days, hours, minutes } = calculateTimeRemaining(endDate)
    const totalMinutes = days * 1440 + hours * 60 + minutes
    return totalMinutes < 1440 // 24시간 미만
  }

  const isTokenExpired = (token) => {
    try {
      const payloadBase64 = token.split('.')[1]
      const decodedPayload = JSON.parse(atob(payloadBase64))
      const expirationTime = decodedPayload.exp
      const currentTimeInSeconds = Math.floor(Date.now() / 1000)

      return currentTimeInSeconds > expirationTime
    } catch (error) {
      console.error('Failed to decode token:', error)
      return true
    }
  }

  const handleFavoriteToggle = async (itemId, isFavorite) => {
    console.log('Favorite Id:', itemId)

    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, favorite: !item.favorite } : item
    )
    setItems(updatedItems)

    const updatedFavoriteItems = updatedItems.filter((item) => item.favorite)
    setFavoriteItems(updatedFavoriteItems)

    try {
      const storedToken = await AsyncStorage.getItem('token')
      console.log('Stored Token:', storedToken)

      if (!storedToken || isTokenExpired(storedToken)) {
        console.error('Token is missing or expired')
        return
      }

      if (isFavorite) {
        const favoriteItem = favoriteItems.find(
          (favItem) => favItem.productId === itemId
        )

        if (favoriteItem) {
          const favoriteId = favoriteItem.id
          console.log('Removing favorite:', favoriteId)

          await axios.delete(`${BASE_URL}/favorite/${favoriteId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          console.log(`Favorite item with ID ${favoriteId} removed`)
        }
      } else {
        console.log('Adding favorite for item:', itemId)

        const response = await axios.post(
          `${BASE_URL}/favorite/add`,
          { productId: itemId },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )
        console.log(`Item with ID ${itemId} added to favorites`, response.data)
      }

      await AsyncStorage.setItem(
        'favoriteItems',
        JSON.stringify(updatedFavoriteItems)
      )
    } catch (error) {
      console.error(
        'Error updating favorite items:',
        error?.response?.data || error
      )
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
    const roundedPrice = Math.ceil(price)
    return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={resetFilters}
          >
            <Text style={styles.categoryButtonText}>전체</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={styles.categoryContainer}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[
                selectedCategory === '물 · 음료' && styles.selectedCategory,
              ]}
              onPress={() => selectCategory('물 · 음료')}
            >
              <Text style={[styles.categoryText]}>물 · 음료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[selectedCategory === '과일' && styles.selectedCategory]}
              onPress={() => selectCategory('과일')}
            >
              <Text style={[styles.categoryText]}>과일</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[selectedCategory === '유제품' && styles.selectedCategory]}
              onPress={() => selectCategory('유제품')}
            >
              <Text style={[styles.categoryText]}>유제품</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[selectedCategory === '건강식' && styles.selectedCategory]}
              onPress={() => selectCategory('건강식')}
            >
              <Text style={[styles.categoryText]}>건강식</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedCategory === '위생용품' && styles.selectedCategory,
              ]}
              onPress={() => selectCategory('위생용품')}
            >
              <Text style={[styles.categoryText]}>위생용품</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[selectedCategory === '기타' && styles.selectedCategory]}
              onPress={() => selectCategory('기타')}
            >
              <Text style={[styles.categoryText]}>기타</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={resetFilters}
          >
            <Text style={styles.categoryButtonText}>전체</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={styles.categoryContainer}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[
                selectLocation === '연세플라자' && styles.selectedCategory,
              ]}
              onPress={() => selectLocation('연세플라자')}
            >
              <Text style={[styles.categoryText]}>연세플라자</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectLocation === '연탄불고기' && styles.selectedCategory,
              ]}
              onPress={() => selectLocation('연탄불고기')}
            >
              <Text style={[styles.categoryText]}>연탄불고기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectLocation === '매지놀이터' && styles.selectedCategory,
              ]}
              onPress={() => selectLocation('매지놀이터')}
            >
              <Text style={[styles.categoryText]}>매지놀이터</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[selectLocation === '기타' && styles.selectedCategory]}
              onPress={() => selectLocation('기타')}
            >
              <Text style={[styles.categoryText]}>기타</Text>
            </TouchableOpacity>
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
                onPress={() =>
                  navigation.navigate('RecruitDetails', { itemId: item.id })
                }
              >
                <Image
                  source={{
                    uri: `${BASE_URL}/images/${item.productImage}`,
                  }}
                  style={styles.deadlineImage}
                />
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
                  {calculateTimeRemaining(item.endDate).days}일{' '}
                  {calculateTimeRemaining(item.endDate).hours}시간{' '}
                  {calculateTimeRemaining(item.endDate).minutes}분{' '}
                  {calculateTimeRemaining(item.endDate).seconds}초
                </Text>
              </View>
              <Text style={styles.itemTitle}>{item.name}</Text>

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
              <View style={styles.row}>
                <Text
                  style={styles.itemText}
                >{`수량 ${item.remainingQty}/${item.qty}`}</Text>
                <Text style={styles.itemPriceWrapper}>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price / item.qty)}
                  </Text>
                  <Text style={styles.priceWon}> 원</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={styles.noResultsContainer}
          onScrollEndDrag={handleScrollEnd}
          scrollEventThrottle={16}
        >
          {noResults && items.length === 0 && !loading && (
            <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
          )}
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
    overflow: 'hidden',
  },

  heartIconContainer: {
    position: 'absolute',
    top: 175,
    right: 5,
    zIndex: 10,
  },

  heartIcon: {
    // position: 'absolute',
    width: 24,
    height: 24,
    resizeMode: 'contain',
    // zIndex: 1,
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

  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    position: 'absolute',
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
})

export default Maintest
