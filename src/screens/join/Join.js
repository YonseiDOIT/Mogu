import React, { useState, useEffect } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native'
import Header from '../../components/Header'

const Join = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isNicknameValid, setIsNicknameValid] = useState(true)
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
  const [isJoinButtonEnabled, setIsJoinButtonEnabled] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const formatPhoneNumber = (input) => {
    const value = input.replace(/\D/g, '') // 숫자가 아닌 문자열 모두 제거
    const formattedValue = value
      .replace(/(\d{3})(\d{1,4})(\d{1,4})/, '$1-$2-$3') // 숫자를 전화번호 형식으로 변환
      .replace(/(-\d{4})\d+?$/, '$1') // 네 번째 그룹 이후의 문자열 삭제
    return formattedValue
  }

  const handlePhoneNumberChange = (input) => {
    const formattedPhoneNumber = formatPhoneNumber(input)
    setPhoneNumber(formattedPhoneNumber)
    setIsPhoneNumberValid(/^\d{3}-\d{3,4}-\d{4}$/.test(formattedPhoneNumber))
  }

  const checkPassword = (text) => {
    setPassword(text)
    setIsPasswordValid(text.length >= 7)
  }

  const checkNickname = (text) => {
    setNickname(text)
    const isValid =
      text.length >= 2 &&
      text.length <= 10 &&
      !['duplicate1', 'duplicate2'].includes(text)
    setIsNicknameValid(isValid)
  }

  useEffect(() => {
    if (isNicknameValid && isPasswordValid && isPhoneNumberValid && isChecked) {
      setIsJoinButtonEnabled(true)
    } else {
      setIsJoinButtonEnabled(false)
    }
  }, [isNicknameValid, isPasswordValid, isPhoneNumberValid, isChecked])

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.join}>가입하기</Text>
        <Text style={styles.description}>잘 하고 있어요!</Text>
      </View>

      <View style={styles.form}>
        <View
          style={[
            styles.inputContainer,
            !isNicknameValid &&
              nickname.length > 0 &&
              styles.invalidInputContainer,
            isNicknameValid &&
              nickname.length > 0 &&
              styles.validInputContainer,
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: isNicknameValid
                  ? nickname.length > 0
                    ? '#4EAA16'
                    : '#D9D9D9'
                  : '#CC0000',
              },
            ]}
          >
            닉네임
          </Text>
          <Image
            source={require('../../../src/assets/nickname.png')}
            style={styles.inputImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="한글 및 숫자 2자 이상 10자 이하"
            style={[
              styles.input,
              {
                borderColor: isNicknameValid
                  ? nickname.length > 0
                    ? '#4EAA16'
                    : '#D9D9D9'
                  : '#CC0000',
              },
            ]}
            value={nickname}
            onChangeText={checkNickname}
          />
        </View>
        {!isNicknameValid && nickname.length > 0 && (
          <Text style={styles.errorText}>중복된 닉네임입니다.</Text>
        )}
      </View>

      <View style={styles.form}>
        <View
          style={[
            styles.inputContainer,
            !isPhoneNumberValid &&
              phoneNumber.length > 0 &&
              styles.invalidInputContainer,
            isPhoneNumberValid &&
              phoneNumber.length > 0 &&
              styles.validInputContainer,
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  phoneNumber.length > 0
                    ? isPhoneNumberValid
                      ? '#4EAA16'
                      : '#D9D9D9'
                    : '#D9D9D9',
              },
            ]}
          >
            휴대폰 번호
          </Text>
          <Image
            source={require('../../../src/assets/phone_g.png')}
            style={styles.inputImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="010-1234-5678"
            style={[
              styles.input,
              {
                borderColor:
                  phoneNumber.length > 0
                    ? isPhoneNumberValid
                      ? '#4EAA16'
                      : '#D9D9D9'
                    : '#D9D9D9',
              },
            ]}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.form}>
        <View
          style={[
            styles.inputContainer,
            !isPasswordValid &&
              password.length > 0 &&
              styles.invalidInputContainer,
            isPasswordValid &&
              password.length > 0 &&
              styles.validInputContainer,
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: isPasswordValid
                  ? password.length > 0
                    ? '#4EAA16'
                    : '#D9D9D9'
                  : '#CC0000',
              },
            ]}
          >
            비밀번호
          </Text>
          <Image
            source={require('../../../src/assets/pw.png')}
            style={styles.inputImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="7자리 이상 영문/숫자 혼합"
            secureTextEntry={!showPassword}
            style={[
              styles.input,
              {
                borderColor: isPasswordValid
                  ? password.length > 0
                    ? '#4EAA16'
                    : '#D9D9D9'
                  : '#CC0000',
              },
            ]}
            value={password}
            onChangeText={checkPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeButton}
          >
            <Image
              source={
                showPassword
                  ? require('../../../src/assets/pw_show.png')
                  : require('../../../src/assets/pw_nshow.png')
              }
              style={styles.pwshow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {!isPasswordValid && password.length > 0 && (
          <Text style={styles.errorText}>
            비밀번호는 최소 7자 이상이어야 합니다.
          </Text>
        )}
      </View>

      <View style={styles.essential}>
        <Text style={styles.textEssential}>필수</Text>
        <View style={styles.space} />
        <TouchableOpacity onPress={() => navigation.navigate('TermsAgree')}>
          <Text style={styles.joinIt}>
            개인정보 제공 및 서비스 이용약관 동의
          </Text>
        </TouchableOpacity>
        <View style={styles.spaceCheck} />
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <Image
            source={
              isChecked
                ? require('../../../src/assets/checkBoxChecked.png')
                : require('../../../src/assets/checkBoxUnchecked.png')
            }
            style={styles.checkbox}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.joinCon,
            {
              backgroundColor: isJoinButtonEnabled ? '#75C743' : '#D3D3D3',
            },
          ]}
          onPress={() => {
            if (isJoinButtonEnabled) {
              navigation.navigate('JoinWelcome')
            }
          }}
          disabled={!isJoinButtonEnabled}
        >
          <Text style={styles.buttonText}>가입하기</Text>
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
  form: {
    marginBottom: '8%',
    marginLeft: '10%',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -5,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invalidInputContainer: {
    borderColor: '#CC0000',
  },
  validInputContainer: {
    borderColor: '#4EAA16',
  },

  input: {
    height: 47,
    borderWidth: 1,
    borderRadius: 15,
    width: '90%',
    paddingLeft: 40,
  },
  inputImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    marginLeft: 10,
    marginTop: -2, // 이미지 위치를 조금 올림
    opacity: 0.5,
    position: 'absolute',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
  },
  pwshow: {
    width: 24,
    height: 24,
    marginRight: 40,
  },

  buttonContainer: {
    justifyContent: 'flex-end',
    marginTop: '5%',
    alignItems: 'center',
  },
  joinButton: {
    marginTop: 10,
    marginBottom: 15,
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
  essential: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '24.5%',
    fontSize: 16,
  },
  textEssential: {
    fontWeight: 'bold',
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  space: {
    width: 10,
  },
  spaceCheck: {
    width: 20,
  },
  joinIt: {
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  joinCon: {
    marginTop: 10,
    marginBottom: 15,
    height: 47,
    width: '83%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },

  message: {
    position: 'absolute',
    fontSize: 14,
    bottom: -18,
  },
  errorText: {
    color: '#CC0000',
    marginLeft: 20,
  },
  success: {
    color: '#4EAA16',
    marginTop: -2,
    marginLeft: 10,
  },
})

export default Join
