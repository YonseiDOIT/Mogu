import React from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const ParticipateComplete = ({ route, navigation }) => {
  const { URL } = route.params
  const openLink = () => {
    Linking.openURL(URL)
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.resetPw}>신청되었습니다 :)</Text>
      </View>
      <ImageBackground
        source={require('../../../assets/ParticipateComplete.png')}
        style={styles.image}
        resizeMode="contain"
      ></ImageBackground>
      <View style={styles.buttonContainer}>
        <Text>아래버튼을 누르고 오픈채팅방으로 입장해주세요</Text>
        <TouchableOpacity style={styles.back} onPress={openLink}>
          <Text style={styles.buttonText}>채팅방으로</Text>
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
    marginBottom: 70,
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
  },

  buttonContainer: {
    alignItems: 'center',
  },

  back: {
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

export default ParticipateComplete
