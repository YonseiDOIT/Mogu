import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'

const RecruitDetails = ({ navigation, isRecruiting }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>

        {/* 이미지 */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
        </View>

        {/* 모집 상태 */}
        <View
          style={[
            styles.statusContainer,
            isRecruiting
              ? styles.recruitingBackground
              : styles.closedBackground,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isRecruiting ? styles.recruitingText : styles.closedText,
            ]}
          >
            {isRecruiting ? '참여 모집 중' : '마감 후 구매 진행 중'}
          </Text>
        </View>

        {/* 하단 상태 */}
        <View style={styles.footerContainer}>
          <View style={styles.footerBox}>
            <Text
              style={[
                styles.footerText,
                isRecruiting
                  ? styles.recruitingFooterText
                  : styles.closedFooterText,
              ]}
            >
              {isRecruiting ? '이미 참여 중' : '신청 불가'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imagePlaceholder: {
    width: '111%',
    height: '130%',
    backgroundColor: 'lightgray',
    top: '-5%',
  },
  statusContainer: {
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
  recruitingBackground: {
    backgroundColor: '#75C743',
  },
  closedBackground: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#75C743',
  },
  recruitingText: {
    color: 'white',
  },
  closedText: {
    color: '#75C743',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerBox: {
    width: '90%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    elevation: 5, // Android 그림자
    shadowColor: 'black', // iOS 그림자
    shadowOffset: { width: 0, height: 1 }, // iOS 그림자
    shadowOpacity: 0.2, // iOS 그림자 불투명도
    shadowRadius: 3.5, // iOS 그림자
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recruitingFooterText: {
    color: '#75C743',
  },
  closedFooterText: {
    color: '#777777',
  },
})

export default RecruitDetails
