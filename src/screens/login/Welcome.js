import React from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/welcome.png')}
        style={styles.image}
        resizeMode="contain"
      ></ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>환영합니다!</Text>
        <Text style={styles.description}>
          모구는 매지리에서 생활하는 모두를 위한{'\n'}
        </Text>
        <Text style={styles.description}>
          공구 어플리케이션입니다. 원하는 물건을 함께 {'\n'}
        </Text>
        <Text style={styles.description}>
          구매하고 더 적은 비용으로 일상을 누리세요!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
  },

  image: {
    width: '100%',
    height: '57%',

    marginTop: 172,
    marginBottom: -160,
  },

  textContainer: {
    marginBottom: 110,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  description: {
    fontSize: 15,
    color: '#777777',
    textAlign: 'center',
    marginBottom: -12,
  },

  buttonContainer: {
    alignItems: 'center',
  },

  startButton: {
    marginTop: 20,
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
    fontSize: 20,
  },
})

export default Welcome
