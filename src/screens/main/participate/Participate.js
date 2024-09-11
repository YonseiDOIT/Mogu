import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import axios from 'axios'
import { BASE_URL } from '../../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Participate = ({ navigation, route }) => {
  useEffect(() => {
    fetchProductDetails()
  }, [])
  const [data, setData] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [confirmChecked, setConfirmChecked] = useState(false)
  const [receiveChecked, setReceiveChecked] = useState(false)

  const { productName, pricePerUnit, remainingQuantity, itemId } = route.params

  const fetchProductDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        throw new Error('Token is missing')
      }
      const response = await axios.get(`${BASE_URL}/products/${itemId}`, {
        params: { id: itemId },
      })
      setData(response.data)
    } catch (error) {}
  }

  const handleConfirmParticipation = () => {
    if (parseInt(quantity) <= remainingQuantity) {
      postparticipant()
      navigation.navigate('ParticipateComplete', { URL: data.chatUrl })
    }
  }

  const postparticipant = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await axios.post(
        `${BASE_URL}/participation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            productId: parseInt(itemId),
            quantity: parseInt(quantity),
          },
        }
      )
      console.log(response)
    } catch (error) {
      console.error('Error posting participation status:', error)
    }
  }

  const handleConfirmCheckboxToggle = () => {
    setConfirmChecked(!confirmChecked)
  }

  const handleReceiveCheckboxToggle = () => {
    setReceiveChecked(!receiveChecked)
  }

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const isButtonDisabled = () => {
    return (
      !quantity ||
      !confirmChecked ||
      !receiveChecked ||
      parseInt(quantity) > remainingQuantity
    )
  }
  function parsePrice(priceString) {
    let cleanedString = priceString.replace(/[^\d]/g, '')
    let price = parseInt(cleanedString, 10)

    return price
  }
  const calculatedAmount = () => {
    const qty = parseInt(quantity)
    const ppu = parsePrice(pricePerUnit)
    if (isNaN(qty) || qty <= 0 || qty > remainingQuantity) return 0
    return ppu * qty
  }
  if (!data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
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
          <Image
            source={{ uri: `${BASE_URL}/images/${data.productImage}` }}
            style={styles.image}
          />
        </View>

        {/* 상품명 */}
        <Text style={styles.productName}>{productName}</Text>

        {/* 개당 가격 */}
        <View style={styles.infoRowNS}>
          <Text style={styles.staticText}>개당</Text>
          <Text style={[styles.dynamicText, styles.dynamic]}>
            ₩ {formatNumberWithCommas(pricePerUnit)}
          </Text>
        </View>

        {/* 남은 개수 */}
        <View style={styles.infoRowNS}>
          <Text style={styles.staticText}>남은 개수</Text>
          <Text style={[styles.dynamicText, styles.dynamic]}>
            {formatNumberWithCommas(remainingQuantity)}
          </Text>
          <Text style={styles.quantity}>개</Text>
        </View>

        {/* 희망 개수 */}
        <View style={styles.infoRow}>
          <Text style={styles.inputContainerTitle}>희망 개수</Text>
          <View style={styles.quantityContainer}>
            <TextInput
              style={styles.quantityInput}
              onChangeText={(text) => setQuantity(text)}
              value={quantity}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.unitText}>개</Text>
        </View>

        {/* 부담 금액 */}
        <View style={styles.infoRow}>
          <Text style={styles.inputContainerTitle}>부담 금액</Text>
          <View style={styles.amount}>
            <Text style={styles.amountText}>
              {formatNumberWithCommas(calculatedAmount())}
            </Text>
            <Text style={styles.unitText}>원</Text>
          </View>
        </View>

        {/* 확정 */}
        <Text style={styles.confirm}>확정</Text>

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
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          isButtonDisabled()
            ? styles.confirmButtonInactive
            : styles.confirmButtonActive,
        ]}
        onPress={handleConfirmParticipation}
        disabled={isButtonDisabled()}
      >
        <Text style={styles.confirmButtonText}>
          {formatNumberWithCommas(quantity)}개{' '}
          {formatNumberWithCommas(calculatedAmount())}원으로 참여할게요!
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
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
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: 20,
  },
  staticText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    marginRight: '3%',
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
  infoRowNS: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainerTitle: {
    marginLeft: 20,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: -150,
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  quantityInput: {
    fontSize: 14,
    width: 100,
    height: 30,
    textAlign: 'right',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '1%',
    marginTop: '15%',
  },
  unitText: {
    fontSize: 14,
    marginLeft: 5,
    marginRight: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: '5%',
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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})

export default Participate
