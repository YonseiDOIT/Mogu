import React, { useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from 'react-native'

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('') // 검색어 입력 상태를 관리하는 상태 변수
  const [recentSearches, setRecentSearches] = useState([]) // 최근 검색어 목록을 관리하는 상태 변수

  const handleBackPress = () => {
    navigation.goBack() // 뒤로 가기 버튼 처리 함수
  }

  const handleSearchPress = () => {
    console.log('search') // 검색 버튼 클릭 시 로그 출력
    // 검색어 추가 및 중복 검사
    if (
      searchText.trim() !== '' &&
      !recentSearches.includes(searchText.trim())
    ) {
      setRecentSearches((prevSearches) => [searchText.trim(), ...prevSearches]) // 새로운 검색어를 목록 맨 앞에 추가
      setSearchText('') // 검색 후 검색어 초기화
    }
  }

  const handleDeleteAll = () => {
    setRecentSearches([]) // 모든 검색어 삭제
  }

  const handleDeleteSearch = (index) => {
    // 특정 인덱스의 검색어 삭제 처리 함수
    setRecentSearches((prevSearches) =>
      prevSearches.filter((_, idx) => idx !== index)
    )
  }

  const handleSearchItemPress = (searchTerm) => {
    navigation.navigate('SearchResult', { searchTerm }) // 검색어를 파라미터로 해서 SearchResult 화면으로 이동
  }

  const renderRecentSearches = () =>
    recentSearches.map((item, index) => {
      const itemWidth = item.length * 12 + 50 // 검색어 길이에 따라 아이템의 가로 길이 계산

      return (
        <View key={index} style={[styles.searchItem, { width: itemWidth }]}>
          <TouchableOpacity
            onPress={() => handleSearchItemPress(item)}
            style={styles.searchItemTouchable}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteSearch(index)}>
            <Text style={styles.deleteButton}>×</Text>
          </TouchableOpacity>
        </View>
      )
    })

  return (
    <View style={styles.screenContainer}>
      <View style={{ flex: 1 }}>
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

        <View style={styles.content}>
          <View style={styles.recentTitleContainer}>
            <Text style={styles.recentTitle}>최근 검색어</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={handleDeleteAll}>
                <Text style={styles.deleteAllButton}>모두 삭제</Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.recentSearchesContainer}
          >
            {renderRecentSearches()}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
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
  backButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  recentTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentTitle: {
    fontSize: 18,
    marginTop: '5%',
    marginLeft: '2%',
  },
  deleteAllButton: {
    fontSize: 16,
    color: '#B3B3B3',
    marginRight: 20,
    top: 10,
  },
  recentSearchesContainer: {
    alignItems: 'center',
    marginTop: -620,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 25,
    marginRight: 10,
    left: '1%',
  },
  searchItemTouchable: {
    flex: 1,
  },
  deleteButton: {
    color: '#B3B3B3',
    fontSize: 20,
    marginLeft: 5,
  },

  onethree: {
    color: '#00B812',
  },
  listItemImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
})

export default Search
