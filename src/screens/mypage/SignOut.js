import React from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import SignOutHeader from '../../components/SignOutHeader'

const ResetPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SignOutHeader/>
      <View style={styles.textContainer}>
        <Text style={styles.resetPw}>나의첫09님,</Text>
        <Text style={styles.resetPw}>정말로 모구를 떠나실 건가요?</Text>

        <Text style={styles.description}>
          계정을 삭제하면 참여 공구, 관심 공구, 내가 주최한 공구를 포함한 모든 활동 정보가 삭제되고 삭제된 정보는 다시 복구할 수 없습니다.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('SignOutFinish')}
        >
          <Text style={styles.buttonText}>탈퇴하기</Text>
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
  textContainer: {
    marginTop: '15%',
    marginLeft: '8%',
  },

  resetPw: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    width:'90%',
    marginTop:10,
    fontSize: 15,
    marginBottom: -12,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop:480
  },

  back: {
    marginTop: -40,
    height: 47,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor:'#75C743',
    borderWidth:1,
    borderRadius: 16,
  },

  buttonText: {
    color: '#75C743',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ResetPassword
