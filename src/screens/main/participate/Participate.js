import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native'

const Participate = ({
  navigation,
  route,
  productName,
  pricePerUnit,
  remainingQuantity,
}) => {
  const [quantity, setQuantity] = useState('')
  const [confirmChecked, setConfirmChecked] = useState(false)
  const [receiveChecked, setReceiveChecked] = useState(false)

  const handleConfirmParticipation = () => {
    navigation.goBack()
  }

  const handleConfirmCheckboxToggle = () => {
    setConfirmChecked(!confirmChecked)
  }

  const handleReceiveCheckboxToggle = () => {
    setReceiveChecked(!receiveChecked)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../../assets/back.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>공구 참여하기</Text>
        </View>

        {/* 이미지 업로드 */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
        </View>

        {/* 상품명 */}
        <Text style={styles.productName}>{productName}</Text>

        {/* 개당 가격 */}
        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Text style={styles.staticText}>개당</Text>
          </View>
          <Text style={[styles.dynamicText, styles.dynamic]}>
            {' '}
            ₩ {pricePerUnit}
          </Text>
        </View>

        {/* 남은 개수 */}
        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Text style={styles.staticText}>남은 개수</Text>
          </View>
          <Text style={[styles.dynamicText, styles.dynamic]}>
            {' '}
            {remainingQuantity}개
          </Text>
        </View>

        {/* 희망 개수 */}
        <View style={styles.infoRow}>
          <Text style={styles.inputContainerTitle}>희망 개수</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.quantityInput}
              onChangeText={(text) => setQuantity(text)}
              value={quantity}
              keyboardType="numeric"
            />
          </View>
          <Text>개</Text>
        </View>

        {/* 부담 금액 */}
        <View style={styles.infoRow}>
          <Text style={styles.inputContainerTitle}>부담 금액</Text>
          <View style={styles.inputContainerWon}></View>
          <Text>원</Text>
        </View>

        {/* 확정 */}
        <View>
          <Text style={[styles.confirm]}>확정</Text>
        </View>

        {/* 확정 체크박스 */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleConfirmCheckboxToggle}
        >
          <Text>참여 취소는 참여 이후 1시간 이내에만 가능합니다.</Text>
          <Image
            source={
              confirmChecked
                ? require('../../../assets/checkBoxChecked.png')
                : require('../../../assets/checkBoxUnchecked.png')
            }
            style={styles.checkboxImage}
          />
        </TouchableOpacity>

        {/* 수령 체크박스 */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleReceiveCheckboxToggle}
        >
          <Text>수령 장소 및 금액, 주최자의 공지를 잘 확인하였습니다.</Text>
          <Image
            source={
              receiveChecked
                ? require('../../../assets/checkBoxChecked.png')
                : require('../../../assets/checkBoxUnchecked.png')
            }
            style={styles.checkboxImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            !quantity || !confirmChecked || !receiveChecked
              ? styles.confirmButtonInactive
              : styles.confirmButtonActive,
          ]}
          onPress={handleConfirmParticipation}
          disabled={!quantity || !confirmChecked || !receiveChecked}
        >
          <Text style={styles.confirmButtonText}>
            {remainingQuantity}개 {pricePerUnit}원으로 참여할게요!
          </Text>
        </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    marginRight: 10,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '4%',
  },
  staticText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
  },
  dynamicText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '3%',
  },
  dynamic: {
    fontSize: 18,
    color: '#75C743',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  infoLabelContainer: {
    width: 80,
  },
  productInfo: {
    fontSize: 16,
    marginBottom: 5,
  },

  inputContainerTitle: {
    borderColor: 'black',
    marginBottom: 10,
    marginLeft: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainerWon: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  quantityInput: {
    fontSize: 16,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
  },
  checkboxImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  confirm: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '4%',
    marginLeft: 20,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  confirmButton: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    alignContent: 'center',
  },
  confirmButtonActive: {
    backgroundColor: '#75C743',
  },
  confirmButtonInactive: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default Participate
