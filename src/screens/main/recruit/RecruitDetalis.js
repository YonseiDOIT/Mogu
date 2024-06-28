import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native'

const RecruitDetails = ({
  navigation,
  isRecruiting,
  isClosed,
  category,
  productName,
  pricePerUnit,
  remainingQuantity,
  timeLeft,
  purchaseLink,
}) => {
  const openLink = () => {
    Linking.openURL(purchaseLink)
  }

  const formattedPrice = pricePerUnit.toLocaleString()
  const formattedQuantity = remainingQuantity.toLocaleString()

  const getStatusText = () => {
    if (isClosed) {
      return '종료되었습니다.'
    } else if (isRecruiting) {
      return '참여 모집 중'
    } else {
      return '마감 후 구매 진행 중'
    }
  }

  const getStatusStyle = () => {
    if (isClosed) {
      return [styles.statusContainer, styles.closed]
    } else if (isRecruiting) {
      return [styles.statusContainer, styles.recruitingBackground]
    } else {
      return [styles.statusContainer, styles.closedBackground]
    }
  }

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

        {/* 이미지 업로드 */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
        </View>

        {/* 모집 상태 */}
        <View style={getStatusStyle()}>
          <Text
            style={[
              styles.statusText,
              isClosed
                ? styles.closedText
                : isRecruiting
                ? styles.recruitingText
                : styles.closedText,
            ]}
          >
            {getStatusText()}
          </Text>
        </View>

        {/* 카테고리 / 구매 링크 */}
        <View style={styles.infoContainer}>
          <Text style={styles.categoryText}>{category}</Text>
          <TouchableOpacity onPress={openLink}>
            <Text style={styles.linkText}>구매 링크{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* 상품 정보 */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.staticText}>개당</Text>
            </View>
            <Text style={[styles.dynamicText, styles.dynamic]}>
              {' '}
              ₩ {formattedPrice}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.staticText}>남은 개수</Text>
            </View>
            <Text style={[styles.dynamicText, styles.dynamic]}>
              {' '}
              {formattedQuantity}개
            </Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.staticText}>마감까지</Text>
            </View>
            <Text style={[styles.dynamicText, styles.dynamic]}>
              {' '}
              {timeLeft}
            </Text>
          </View>

          {/* 구분선 추가 */}
          <View style={styles.separator} />
        </View>

        {/* 하단 상태 텍스트 */}
        <View style={styles.footerContainer}>
          <View
            style={[
              styles.footerBox,
              isRecruiting
                ? styles.recruitingFooterBox
                : styles.closedFooterBox,
            ]}
          >
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
    color: '#777777',
  },
  closed: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#777777',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#75C743',
    textDecorationLine: 'underline',
    marginTop: '2%',
  },
  linkText: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#B3B3B3',
    marginTop: '7%',
  },
  productInfoContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '4%',
    marginBottom: '8%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  infoLabelContainer: {
    width: 80,
  },
  staticText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  dynamicText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '3%',
  },
  dynamic: {
    color: '#75C743',
  },
  separator: {
    width: '120%',
    height: 17,
    marginLeft: -20,
    backgroundColor: '#F6F6F6',
    marginVertical: 2,
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
    shadowColor: '#000', // iOS 그림자
    shadowOffset: { width: 0, height: 2 }, // iOS 그림자 오프셋
    shadowOpacity: 0.25, // iOS 그림자 불투명도
    shadowRadius: 3.84, // iOS 그림자 반경
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
  recruitingFooterBox: {
    borderColor: '#75C743',
  },
  closedFooterBox: {
    borderColor: '#777777',
  },
})

export default RecruitDetails
