import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SearchResult = () => {
  return (
    <View style={styles.container}>
      <Text>Search Result Screen</Text>
      {/* Add your search result content here */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SearchResult
