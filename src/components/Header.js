import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const navigation = useNavigation()

  return (
    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image
        source={require('../assets/backButton.png')}
        style={styles.image}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    marginLeft: '7%',
    marginTop: '16%',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
})

export default Header
