import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SearchResult = ({ route, navigation }) => {
  const { token, keyword, page = 0, size = 10 } = route.params
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isFocused = useIsFocused()

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
      let storedToken
      try {
        if (storedToken) {
          const storedToken = await AsyncStorage.getItem('token')
          console.log('Fetched token:', token)
          console.log('Request parameters:', { keyword, page, size })

          const response = await axios.get(`${BASE_URL}/products/search`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              keyword: keyword,
              page: page,
              size: size,
            },
          })

          console.log('Response data:', response.data)
          setResults(response.data.content)
        }
      } catch (err) {
        if (err.response) {
          console.error('Error response:', err.response)
          if (err.response.status === 403) {
            console.error('403 Forbidden Error:', err.message)
          }
        } else {
          console.error('Error:', err.message)
        }
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    if (isFocused) {
      fetchSearchResults()
    }
  }, [isFocused, keyword, page, size])

  return (
    <View style={styles.itemsGrid}>
      {results.map((item) => (
        <View key={item.id} style={styles.itemWrapper}>
          {isDeadlineSoon(item.endDate) && (
            <Image
              source={{
                uri: `${BASE_URL}/images/${item.productImage}`,
              }}
              style={styles.deadlineImage}
            />
          )}
          <TouchableOpacity
            style={styles.itemBox}
            onPress={() => navigation.navigate('CreateGroupPurchase')}
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
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.priceWon}> 원</Text>
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
