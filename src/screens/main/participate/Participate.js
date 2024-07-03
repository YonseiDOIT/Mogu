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

const Participate = ({ navigation }) => {
  const [quantity, setQuantity] = useState('')
  const [locationChecked, setLocationChecked] = useState(false)

  const handleConfirmParticipation = () => {
    navigation.goBack()
  }

  const handleCheckboxToggle = () => {
    setLocationChecked(!locationChecked)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header */}
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

        {/* Product Information */}
        <Text style={styles.productName}>상품명</Text>
        <Text style={styles.productInfo}>개당 가격: n원</Text>
        <Text style={styles.productInfo}>남은 개수: n개</Text>

        {/* Desired Quantity */}
        <Text style={styles.productInfo}>희망 개수: n개</Text>

        {/* Quantity Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.quantityInput}
            placeholder="n개로 참여할게요!"
            onChangeText={(text) => setQuantity(text)}
            value={quantity}
            keyboardType="numeric"
          />
        </View>

        {/* Checkbox for Location */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleCheckboxToggle}
        >
          <Image
            source={
              locationChecked
                ? require('../../../assets/checkBoxChecked.png')
                : require('../../../assets/checkBoxUnchecked.png')
            }
            style={styles.checkboxImage}
          />
          <Text>수령 장소는 n입니다.</Text>
        </TouchableOpacity>

        {/* Confirm Participation Button */}
        <TouchableOpacity
          style={
            quantity && locationChecked
              ? styles.confirmButtonActive
              : styles.confirmButtonInactive
          }
          onPress={handleConfirmParticipation}
          disabled={!quantity || !locationChecked}
        >
          <Text style={styles.confirmButtonText}>확정</Text>
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
    paddingHorizontal: 20,
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
    marginBottom: 10,
  },
  productInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
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
  },
  checkboxImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  confirmButtonActive: {
    backgroundColor: '#75C743',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonInactive: {
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default Participate
