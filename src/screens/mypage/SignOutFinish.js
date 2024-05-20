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
        <Text style={styles.resetPw}>완료되었습니다 :)</Text>
        <Text style={styles.description}>
            모구를 이용해주셔서 감사합니다.        
        </Text>
      </View>
      <ImageBackground
        source={require('../../assets/Goodbye.png')}
        style={styles.image}
        resizeMode="contain"
      ></ImageBackground>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>처음으로</Text>
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

export default ResetPassword
