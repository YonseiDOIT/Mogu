import React, { useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../../components/Header'

const TermsAgree = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.join}>약관 동의</Text>
        <Text style={styles.description}>개인정보 제공에 대한 법률</Text>
      </View>

      <View style={styles.agreementContainer}>
        <Text style={styles.agreementTextTitle}>서비스 이용 약관</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.agreementText}>
            안녕하세요 모두의 공구, 모구입니다 :D{'\n'}
            소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런
            이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한
            이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠,
            라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다.{'\n'}
            소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런
            이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한
            이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠,
            라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다.{'\n'}
            소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런
            이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한
            이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠,
            라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다.{'\n'}
            소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런
            이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한
            이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠,
            라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다.{'\n'}
            소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런
            이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한
            이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠,
            라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다.{'\n'}
          </Text>
        </ScrollView>
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
    marginBottom: 110,
    marginTop: '30%',
    marginLeft: '8%',
  },

  join: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    marginBottom: -12,
  },

  agreementContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    marginHorizontal: '5%',
    borderRadius: 10,
    padding: 10,
    marginBottom: '10%',
    marginTop: '-15%',
  },

  scrollView: {
    flex: 1,
    // paddingHorizontal: 10,
  },

  agreementTextTitle: {
    fontSize: 18,
    margin: 10,
  },

  agreementText: {
    fontSize: 16,
    margin: 10,
  },
})

export default TermsAgree
