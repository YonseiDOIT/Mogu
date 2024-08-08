import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SearchResult = ({ route, navigation }) => {
  const { keyword, page = 0, size = 10, token } = route.params
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isFocused = useIsFocused()
  const [storedToken, setStoredToken] = useState(token || '')
  const [searchText, setSearchText] = useState('')

  const handleBackPress = () => {
    navigation.goBack()
  }

  // 검색창
  const renderSearchBar = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="관심 있는 상품을 검색해보세요."
            placeholderTextColor="#B3B3B3"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearchPress} // 엔터 키로 검색 가능
          />
          <TouchableOpacity onPress={handleSearchPress}>
            <Image
              source={require('../../assets/search.png')}
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const handleSearchPress = async () => {
    console.log('search') // 검색 버튼 클릭 확인 로그
    // 검색어 추가 및 중복 검사
    if (searchText.trim() !== '') {
      try {
        const storedToken = await AsyncStorage.getItem('token')
        if (storedToken) {
          setLoading(true)
          const response = await axios.get(`${BASE_URL}/products/search`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            params: {
              keyword: searchText.trim(),
              page: 0,
              size: 10,
            },
          })

          setResults(response.data.content)
          setSearchText('')
        } else {
          console.error('토큰이 없습니다.')
        }
      } catch (error) {
        console.error('검색 중 오류 발생:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
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

  const isDeadlineSoon = (time) => {
    const totalSeconds = parseInt(time, 10)
    const totalMinutes = totalSeconds / 60
    return totalMinutes < 1440 // 24시간 미만 (1440분)
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true)
      try {
        const storedToken = token || (await AsyncStorage.getItem('token'))
        if (!storedToken) {
          console.log('토큰이 없습니다.')
          return
        }
        setStoredToken(storedToken)

        console.log('token:', storedToken)
        console.log('parameters:', { keyword, page, size })
        if (token) {
          const storedToken = token || (await AsyncStorage.getItem('token'))

          const response = await axios.get(`${BASE_URL}/products/search`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            params: {
              keyword: keyword,
              page: page,
              size: size,
            },
          })

          console.log('Response data:', response.data)
          setResults(response.data.content)

          if (response.data.content.length === 0) {
            console.log('검색 결과가 없습니다.')
          }
        }
      } catch (err) {
        if (err.response) {
          console.error('Error response:', err.response)
          if (err.response.status === 403) {
            console.error('에러 403 - 접근 거부:', err.response.data.message)
          }
        } else {
          console.error('에러:', err.message)
        }
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    if (isFocused) {
      fetchSearchResults()
    }
  }, [isFocused, keyword, page, size, token])

  const handleFavoriteToggle = async (itemId) => {
    const updatedResults = results.map((item) =>
      item.id === itemId ? { ...item, favorite: !item.favorite } : item
    )
    setResults(updatedResults)
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <View style={styles.screenContainer}>
      {renderSearchBar()}
      <View style={styles.itemsGrid}>
        {results.map((item) => (
          <View key={item.id} style={styles.itemWrapper}>
            {isDeadlineSoon(item.endDate) && (
              <Image
                source={{
                  uri: `${BASE_URL}/images/${item.productImage}`,
                }}
                style={[styles.deadlineImage]}
              />
            )}
            <TouchableOpacity
              style={styles.itemBox}
              onPress={() => navigation.navigate('RecruitDetails')}
            >
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
                {formatTime(item.endDate)}
              </Text>
            </View>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <View style={styles.row}>
              <Text
                style={styles.itemText}
              >{`수량 ${item.remainingQty}/${item.qty}`}</Text>
              <Text style={styles.itemPriceWrapper}>
                <Text style={styles.itemPrice}> {formatPrice(item.price)}</Text>
                <Text style={styles.priceWon}> 원</Text>
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginTop: 50,
    height: 60,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 37,
    fontSize: 16,
  },
  searchButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  textContainer: {
    justifyContent: 'center',
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

  deadlineImage: {
    position: 'absolute',
    width: '100%',
    height: '71%',
    zIndex: 1,
    borderRadius: 10,
  },

  itemBox: {
    width: '100%',
    height: 170,
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

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineSoonText: {
    color: '#F25151',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    color: '#777777',
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
})

export default SearchResult
