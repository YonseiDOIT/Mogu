import React from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const ResetPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeBig}>나의 첫 09님,{'\n'}환영합니다 :)</Text>
        <Text style={styles.description}>
          모구가 경제적인 매지리 생활을 도와드릴게요.{'\n'}
          지금 바로 시작해보세요!
        </Text>
      </View>
      <ImageBackground
        source={require('../../assets/welcomeJoin.png')}
        style={styles.image}
        resizeMode="contain"
      ></ImageBackground>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>완료하기</Text>
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

  welcomeBig: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  description: {
    fontSize: 15,
    marginBottom: -12,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: '-11.5%',
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

export default ResetPassword
