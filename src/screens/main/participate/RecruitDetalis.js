import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import axios from 'axios'
import { BASE_URL } from '../../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  isFavorite: initialIsFavorite,
  isApplicant,
  applicantQuantity,
  hostDesiredQuantity,
  applicationTime,
  isHost,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [appliedWithinHour, setAppliedWithinHour] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentApplicantQuantity, setCurrentApplicantQuantity] =
    useState(applicantQuantity)
  const [currentIsApplicant, setCurrentIsApplicant] = useState(isApplicant)
  const [currentIsRecruiting, setCurrentIsRecruiting] = useState(isRecruiting)
  const [closeRecruitmentModalVisible, setCloseRecruitmentModalVisible] =
    useState(false)
  const [isOptionsVisible, setIsOptionsVisible] = useState(false)
  const [isEndModalVisible, setIsEndModalVisible] = useState(false)
  const [isCloseConfirmationModalVisible, setIsCloseConfirmationModalVisible] =
    useState(false)
  const [isCloseRecruitmentModalVisible, setIsCloseRecruitmentModalVisible] =
    useState(false)

  useEffect(() => {
    setIsFavorite(initialIsFavorite)
  }, [initialIsFavorite])

  useEffect(() => {
    if (isApplicant && applicationTime) {
      const now = new Date()
      const applicationDate = new Date(applicationTime)
      const timeDifference = now - applicationDate
      setAppliedWithinHour(timeDifference < 3600000)
    }
  }, [isApplicant, applicationTime])

  useEffect(() => {
    if (timeLeft === '0일 0시간 0분') {
      setCurrentIsRecruiting(false)
    }
  }, [timeLeft])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const openLink = () => {
    Linking.openURL(purchaseLink)
  }

  const handleParticipate = () => {
    setCurrentIsApplicant(true)
    setCurrentApplicantQuantity(currentApplicantQuantity + 1)
    navigation.navigate('Participate')
  }

  const handleCancelParticipation = () => {
    setIsModalVisible(true)
  }

  const confirmCancelParticipation = () => {
    setCurrentIsApplicant(false)
    setCurrentApplicantQuantity(currentApplicantQuantity - 1)
    setIsModalVisible(false)
  }

  const handleCloseRecruitment = () => {
    setCloseRecruitmentModalVisible(true)
  }

  const confirmCloseRecruitment = () => {
    setCurrentIsRecruiting(false)
    setCloseRecruitmentModalVisible(false)
  }

  // 신청 마감하기 버튼을 눌렀을 때
  const handleEndRecruitment = () => {
    // setIsEndModalVisible(true)
    setIsCloseConfirmationModalVisible(true) // 신청 마감 확인 모달을 열기
  }

  // 신청 마감 확인 모달에서 마감하기 버튼을 눌렀을 때
  const handleConfirmEndRecruitment = () => {
    setIsCloseConfirmationModalVisible(false) // 신청 마감 확인 모달을 닫기
    setIsCloseRecruitmentModalVisible(true) // 공구 종료 모달을 열기
  }

  // 공구 종료하기 버튼을 눌렀을 때 실행되는 함수
  const handleEndRecruitmentFinal = () => {
    // 여기에 공구 종료 처리 로직을 추가할 수 있습니다.
    setIsCloseRecruitmentModalVisible(false) // 공구 종료 모달을 닫기
  }

  const confirmEndRecruitment = () => {
    setCurrentIsRecruiting(false)
    setIsEndModalVisible(false)
    setIsCloseRecruitmentModalVisible(false)
  }

  const handleManageParticipants = () => {
    navigation.navigate('ParticipantInfo')
  }

  const formattedPrice = pricePerUnit ? pricePerUnit.toLocaleString() : ''
  const formattedQuantity = remainingQuantity
    ? remainingQuantity.toLocaleString()
    : ''

  const getStatusText = () => {
    if (isClosed || timeLeft === '0일 0시간 0분') {
      return (
        <Text style={[styles.statusText, styles.closedText]}>
          종료되었습니다.
        </Text>
      )
    } else if (currentIsRecruiting) {
      return (
        <Text style={[styles.statusText, styles.recruitingText]}>
          참여 모집 중
        </Text>
      )
    } else {
      return (
        <Text style={[styles.statusText, styles.closedTexting]}>
          마감 후 구매 진행 중
        </Text>
      )
    }
  }

  const getStatusStyle = () => {
    if (isClosed || timeLeft === '0일 0시간 0분') {
      return [styles.statusContainer, styles.closed]
    } else if (currentIsRecruiting) {
      return [styles.statusContainer, styles.recruitingBackground]
    } else {
      return [styles.statusContainer, styles.closedBackground]
    }
  }

  const getFooterStyle = () => {
    if (isHost) {
      if (currentIsRecruiting) {
        return [styles.footerBox, styles.manageButton]
      } else {
        return [styles.footerBox, styles.closedFooterText]
      }
    } else {
      if (isClosed || timeLeft === '0일 0시간 0분') {
        return [styles.footerBox, styles.footerClosed]
      } else if (currentIsRecruiting) {
        if (currentIsApplicant && appliedWithinHour) {
          return [styles.footerBox, styles.cancelButton]
        } else if (currentIsApplicant) {
          return [styles.footerBox, styles.footerAlreadyParticipating]
        } else {
          return [styles.footerBox, styles.participateButton]
        }
      } else {
        return [styles.footerBox, styles.footerClosed]
      }
    }
  }

  const getFooterTextStyle = () => {
    if (isClosed || timeLeft === '0일 0시간 0분') {
      return [styles.footerText, styles.closedFooterText]
    } else if (currentIsRecruiting) {
      if (currentIsApplicant && appliedWithinHour) {
        return [styles.footerText]
      } else if (currentIsApplicant) {
        return [styles.footerText, styles.recruitingFooterText]
      } else {
        return [styles.footerText]
      }
    } else {
      return [styles.footerText, styles.closedFooterText]
    }
  }

  const getFooterText = () => {
    if (isClosed || timeLeft === '0일 0시간 0분') {
      return '종료된 공구'
    } else if (currentIsRecruiting) {
      if (currentIsApplicant && appliedWithinHour) {
        return '× 참여 취소하기'
      } else if (currentIsApplicant) {
        return '이미 참여 중'
      } else {
        return `참여하기 (${currentApplicantQuantity}/${hostDesiredQuantity})`
      }
    } else {
      return '신청 불가'
    }
  }

  const renderHostButtons = () => {
    console.log(
      'renderHostButtons called',
      isHost,
      currentIsApplicant,
      currentIsRecruiting
    )

    if (isHost) {
      return (
        <View style={styles.hostButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.manageButton,
              currentIsRecruiting && styles.closeButton,
            ]}
            onPress={handleCloseRecruitment}
          >
            <Text style={styles.manageButtonText}>
              {currentIsRecruiting ? '신청 마감하기' : '공구 종료하기'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.manageButtonP}
            onPress={handleManageParticipants}
          >
            <Text style={styles.manageButtonTextP}>참여자 정보 관리</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  const renderParticipantButtons = () => {
    if (!isHost) {
      if (isClosed || timeLeft === '0일 0시간 0분') {
        return (
          <View style={styles.footerBox}>
            <Text style={[styles.footerText, styles.closedFooterText]}>
              {getFooterText()}
            </Text>
          </View>
        )
      } else if (currentIsRecruiting) {
        if (currentIsApplicant && appliedWithinHour) {
          return (
            <TouchableOpacity
              style={[styles.footerBox, styles.cancelButton]}
              onPress={handleCancelParticipation}
            >
              <Text style={styles.footerText}>{getFooterText()}</Text>
            </TouchableOpacity>
          )
        } else if (currentIsApplicant) {
          return (
            <View style={[styles.footerBox, styles.footerAlreadyParticipating]}>
              <Text style={styles.footerText}>{getFooterText()}</Text>
            </View>
          )
        } else {
          return (
            <TouchableOpacity
              style={[styles.footerBox, styles.participateButton]}
              onPress={handleParticipate}
            >
              <Text style={styles.footerText}>{getFooterText()}</Text>
            </TouchableOpacity>
          )
        }
      } else {
        return (
          <View style={styles.footerBox}>
            <Text style={[styles.footerText, styles.closedFooterText]}>
              {getFooterText()}
            </Text>
          </View>
        )
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../../assets/back.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>

          {/* 글 수정하기 */}
          {isHost && currentIsRecruiting && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={() => setIsOptionsVisible(!isOptionsVisible)}
              >
                <Text style={styles.optionsButtonText}>⋮</Text>
              </TouchableOpacity>
              {isOptionsVisible && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setIsOptionsVisible(false)
                    navigation.navigate('EditRecruit')
                  }}
                >
                  <Text style={styles.editButtonText}>수정하기</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* 이미지 업로드 */}
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder} />
          </View>

          {/* 모집 상태 */}
          <View style={getStatusStyle()}>
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>

          {/* 카테고리 */}
          <View style={styles.infoContainer}>
            <Text style={styles.categoryText}>{category}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Image
                source={
                  isFavorite
                    ? require('../../../assets/heart.png')
                    : require('../../../assets/emptyheart.png')
                }
                style={styles.heartImage}
              />
            </TouchableOpacity>
          </View>

          {/* 상품 정보 */}
          <View style={styles.productInfoContainer}>
            <Text style={styles.productName}>{productName}</Text>
            <TouchableOpacity onPress={openLink}>
              <Text style={styles.linkText}>구매 링크{'>'}</Text>
            </TouchableOpacity>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.staticText}>개당</Text>
              </View>

              {/* 가격 */}
              <Text style={[styles.dynamicText, styles.dynamic]}>
                {' '}
                ₩ {formattedPrice}
              </Text>
            </View>

            {/* 남은 개수 */}
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.staticText}>남은 개수</Text>
              </View>
              <Text style={[styles.dynamicText, styles.dynamic]}>
                {' '}
                {formattedQuantity}개
              </Text>
            </View>

            {/* 마감까지 */}
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.staticText}>마감까지</Text>
              </View>
              <Text style={[styles.dynamicText, styles.dynamic]}>
                {' '}
                {timeLeft}
              </Text>
            </View>
          </View>

          {/* 구분선 추가 */}
          <View style={styles.separator} />

          {/* 공지 */}
          <View>
            <Text style={[styles.announceTitle]}>공지</Text>
            <Text style={[styles.announce]}>공지 예시</Text>
          </View>
        </ScrollView>

        {renderHostButtons()}
        {renderParticipantButtons()}

        {/* 참여 취소 */}
        {currentIsApplicant && (
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>참여를 취소하시겠습니까?</Text>
              <Text style={styles.modalText}>
                해당 공동구매에 더이상 참여할 수 없습니다.{' '}
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButtonGo}
                  onPress={confirmCancelParticipation}
                >
                  <Text style={[styles.modalButtonGoText]}>계속하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={[styles.modalButtonCancelText]}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* 모집 마감 */}
        <Modal
          isVisible={closeRecruitmentModalVisible}
          onBackdropPress={() => setCloseRecruitmentModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>신청을 마감하시겠습니까?</Text>
            <Text style={styles.modalText}>
              해당 공동구매에 더이상 다른{'\n'}
              사용자가 참여할 수 없습니다.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonGo}
                onPress={confirmCloseRecruitment}
              >
                <Text style={styles.modalButtonGoText}>마감하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setCloseRecruitmentModalVisible(false)}
              >
                <Text style={styles.modalButtonCancelText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 공구 종료 */}
        {isHost && !currentIsRecruiting && (
          <Modal isVisible={closeRecruitmentModalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>공구를 종료하시겠습니까?</Text>
              <Text style={styles.modalTitle}>
                모든 구매자가 상품을 수령했거나 해당 공구를{'\n'}더이상 진행하지
                않으려면 종료 버튼을 눌러주세요.{'\n'} 종료 시 게시글이
                비활성화됩니다.
              </Text>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmCloseRecruitment}
                >
                  <Text style={styles.modalButtonGo}>종료하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setCloseRecruitmentModalVisible(false)}
                >
                  <Text style={styles.modalButtonCancel}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  optionsContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  optionsButton: {
    padding: 8,
  },
  optionsButtonText: {
    fontSize: 24,
  },

  editButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  statusContainer: {
    alignItems: 'center',
    padding: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  recruitingText: {
    color: '#75C743',
  },
  closedText: {
    color: '#777777',
  },
  closedTexting: {
    color: '#75C743',
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
  closed: {
    color: '#777777',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#777777',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#75C743',
    textDecorationLine: 'underline',
    marginTop: '5%',
  },
  heartImage: {
    resizeMode: 'contain',
    width: 22,
    height: 22,
    marginTop: '60%',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B3B3B3',
    marginTop: '1%',
    marginBottom: '8%',
  },
  productInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '4%',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    left: '5%',
    right: '5%',
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
    color: 'white',
    textAlign: 'center',
  },
  recruitingFooterText: {
    color: '#75C743',
  },
  closedFooterText: {
    color: '#777777',
  },
  participateButton: {
    borderRadius: 15,
    borderColor: '#75C743',
    backgroundColor: '#75C743',
  },
  cancelButton: {
    borderRadius: 15,
    borderColor: '#C7434B',
    backgroundColor: '#C7434B',
  },
  footerAlreadyParticipating: {
    borderColor: '#75C743',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  footerClosed: {
    borderColor: '#777777',
    backgroundColor: 'white',
  },
  confirmButton: {
    backgroundColor: '#C7434B',
    marginLeft: 10,
  },
  cancelModalButton: {
    backgroundColor: 'white',
    borderColor: '#9C9C9C',
    borderWidth: 1,
    marginRight: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalButtonTextCancel: {
    color: '#9C9C9C',
  },
  modalButtonGo: {
    borderRadius: 8,
    backgroundColor: '#C7434B',
    width: '45%',
    height: 38,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  modalButtonGoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalButtonCancel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777777',
    backgroundColor: 'white',
    width: '45%',
    height: 38,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  modalButtonCancelText: {
    color: '#9C9C9C',
    fontSize: 14,
    fontWeight: 'bold',
  },

  hostButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    bottom: 30,
  },
  manageButton: {
    backgroundColor: '#C7434B',
    borderColor: '#C7434B',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '45%',
    height: 42,
    margin: 5,
    bottom: '-15%',
    elevation: 5, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: { width: 0, height: 2 }, // iOS 그림자 오프셋
    shadowOpacity: 0.25, // iOS 그림자 불투명도
    shadowRadius: 3.84, // iOS 그림자 반경
  },
  manageButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  manageButtonP: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '45%',
    height: 42,
    margin: 5,
    bottom: '-15%',
    borderWidth: 2,
    borderColor: '#75C743',
    elevation: 5, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: { width: 0, height: 2 }, // iOS 그림자 오프셋
    shadowOpacity: 0.25, // iOS 그림자 불투명도
    shadowRadius: 3.84, // iOS 그림자 반경
  },
  manageButtonTextP: {
    fontSize: 16,
    color: '#75C743',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#75C743',
    borderColor: '#75C743',
  },

  announceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '4%',
    marginLeft: 20,
  },
  announce: {
    fontSize: 16,
    marginTop: '4%',
    marginLeft: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '80% ',
    borderRadius: '12',
    padding: 20,
    height: '20%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#CC0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingBottom: '7.5%',
    paddingTop: '9%',
    borderRadius: 12,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default RecruitDetails
