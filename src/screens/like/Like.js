import React, { useState } from 'react'
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LikeHeader from '../../components/LikeHeader'

function Maintest() {
  const navigation = useNavigation()
  const [selectedSort, setSelectedSort] = useState('기한임박순')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [items, setItems] = useState([
    {
      id: 1,
      quantity: '5개',
      time: '23',
      title: '상품 1',
      price: '3,000',
      favorite: true,
    },
    {
      id: 2,
      quantity: '3개',
      time: '1430',
      title: '상품 2',
      price: '500',
      favorite: false,
    },
    {
      id: 3,
      quantity: '7개',
      time: '1440',
      title: '상품 3',
      price: '15,000',
      favorite: true,
    },
    {
      id: 4,
      quantity: '1개',
      time: '3000',
      title: '상품 4',
      price: '4,200',
      favorite: false,
    },
  ])

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const selectSortOption = (option) => {
    setSelectedSort(option)
    setDropdownVisible(false)
  }

  const formatTime = (time) => {
    const totalMinutes = parseInt(time, 10)
    if (totalMinutes >= 1440) {
      const days = Math.floor(totalMinutes / 1440)
      const hours = Math.floor((totalMinutes % 1440) / 60)
      const minutes = totalMinutes % 60
      return `${days}일 ${hours}시간 ${minutes}분`
    } else if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      return `${hours}시간 ${minutes}분`
    } else {
      const seconds = (totalMinutes * 60) % 60
      return `${totalMinutes}분 ${seconds}초`
    }
  }

  const isDeadlineSoon = (time) => {
    const totalMinutes = parseInt(time, 10)
    return totalMinutes < 1440 // 24시간 미만
  }

  const handleFavoriteToggle = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, favorite: !item.favorite } : item
    )
    setItems(updatedItems)
  }

  return (
    <View style={styles.screenContainer}>
      <LikeHeader/>
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
            <View key={item.id} style={styles.itemWrapper}>
              {isDeadlineSoon(item.time) && (
                <Image
                  source={require('../../assets/deadline.png')}
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
                <Text style={styles.itemText}>{formatTime(item.time)}</Text>
                <MaterialIcons
                  name="access-time"
                  size={16}
                  color="#333"
                  style={styles.timeIcon}
                />
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.row}>
                <Text style={styles.itemText}>{`수량 ${item.quantity}`}</Text>
                <Text style={styles.itemPrice}>{`${item.price} 원`}</Text>
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
    marginTop:20,
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
    width: 42,
    height: 42,
    zIndex: 1,
  },
})

export default Maintest
