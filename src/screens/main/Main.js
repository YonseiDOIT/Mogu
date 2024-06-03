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
import Icon from 'react-native-vector-icons/MaterialIcons'

const Main = () => {
  const [selectedSort, setSelectedSort] = useState('기한임박순')
  const [dropdownVisible, setDropdownVisible] = useState(false)

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

  const items = [
    {
      id: 1,
      quantity: '5개',
      time: '23', // 시간
      title: '상품 1',
      price: '3,000',
    },
    {
      id: 2,
      quantity: '3개',
      time: '60',
      title: '상품 2',
      price: '500',
    },
    {
      id: 3,
      quantity: '7개',
      time: '180',
      title: '상품 3',
      price: '15,000',
    },
    {
      id: 4,
      quantity: '1개',
      time: '30',
      title: '상품 4',
      price: '4,200',
    },
  ]

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/m09.png')} style={styles.m09} />
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="검색" />
          <TouchableOpacity style={styles.searchButtonContainer}>
            <Image
              source={require('../../assets/search.png')}
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../assets/alarm.png')}
            style={styles.alarmButton}
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
            <Text style={styles.categoryText}>물 · 음료</Text>
            <Text style={styles.categoryText}>과일</Text>
            <Text style={styles.categoryText}>유제품</Text>
            <Text style={styles.categoryText}>건강식</Text>
            <Text style={styles.categoryText}>위생용품</Text>
            <Text style={styles.categoryText}>기타</Text>
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
            <Text style={styles.categoryText}>연세플라자</Text>
            <Text style={styles.categoryText}>연탄불고기</Text>
            <Text style={styles.categoryText}>매지놀이터</Text>
            <Text style={styles.categoryText}>기타</Text>
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

      <ScrollView style={styles.itemsContainer}>
        <View style={styles.itemsGrid}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              <TouchableOpacity style={styles.itemBox} />
              <View style={styles.row}>
                <Text style={styles.itemText}>수량 {item.quantity}</Text>
                <View style={styles.timeContainer}>
                  <Icon
                    name="access-time"
                    size={16}
                    color="#333"
                    style={styles.timeIcon}
                  />
                  <Text style={styles.itemText}>{formatTime(item.time)}</Text>
                </View>
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.rowPrice}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.priceWon}> 원</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
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
    width: 50,
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
    right: 10,
    top: 8,
  },

  searchButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  alarmButton: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 10,
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
    // Android
    elevation: 5,
    // iOS
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
    padding: 10,
  },

  itemWrapper: {
    width: '48%',
    marginBottom: 10,
  },

  itemBox: {
    width: '100%',
    height: '65%',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  rowPrice: {
    flexDirection: 'row',
    alignContent: 'center',
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
    bottom: '4.5%',
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
})

export default Main
