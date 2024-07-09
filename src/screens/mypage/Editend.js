import React from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const Editend = ({ navigation, route }) => {
  const { updatedNickname } = route.params || {}

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.resetPw}>수정되었습니다 :)</Text>
        <Text style={styles.description}>지금 바로 공구에 참여해보세요</Text>
      </View>
      <ImageBackground
        source={require('../../assets/passwordRe.png')}
        style={styles.image}
        resizeMode="contain"
      ></ImageBackground>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            navigation.navigate('MyInfoCheck', { updatedNickname })
          }
        >
          <Text style={styles.buttonText}>되돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  image: {
    width: '100%',
    height: '50%',
    marginTop: 10,
  },

  textContainer: {
    marginBottom: 110,
    marginTop: '30%',
    marginLeft: '8%',
  },

  resetPw: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  description: {
    fontSize: 15,
    marginBottom: -12,
  },

  buttonContainer: {
    alignItems: 'center',
  },

  back: {
    marginTop: -40,
    height: 47,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75C743',
    borderRadius: 16,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default Editend
