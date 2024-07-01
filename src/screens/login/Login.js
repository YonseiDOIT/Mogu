import React, { useState, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { AuthContext } from '../../App'; // AuthContext 임포트

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const { setIsLoggedIn } = useContext(AuthContext); // AuthContext 사용

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkEmail = (inputEmail) => {
    // 필요한 유효성 검사 로직
    const isValid = /^[^@\s]+@/.test(inputEmail);
    setIsEmailValid(isValid);
  };

  const checkPassword = (inputPassword) => {
    // 유효성 검사 로직
    const isValid = inputPassword.length >= 7;
    setIsPasswordValid(isValid);
  };

  const handleLogin = async () => {
    checkEmail(email);
    checkPassword(password);

    // 임시로 설정된 이메일과 비밀번호 검증
    if (email === 'mogu' && password === '121212') {
      setIsEmailValid(true);
      setIsPasswordValid(true);
      setIsLoggedIn(true);
       // 로그인 상태 업데이트
    } else {
      setIsEmailValid(false);
      setIsPasswordValid(false);
      setIsLoggedIn(true); //-> 이거 수정하면 됩니당 오류가 떠도 로그인되는 코드
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.textContainer}>
        <Text style={styles.login}>로그인</Text>
        <Text style={styles.description}>
          공구하고 경제적인 매지리 생활하세요!
        </Text>
      </View>
      <View style={styles.mailPw}>
        <View
          style={[
            styles.inputContainer,
            !isEmailValid && styles.invalidInputContainer,
          ]}
        >
          <Image
            source={require('../../assets/mail.png')}
            style={[styles.image, { display: emailTouched ? 'none' : 'flex' }]}
            resizeMode="contain"
          />
          {(emailTouched || email) && (
            <Text
              style={[
                styles.label,
                { color: isEmailValid ? '#D9D9D9' : '#CC0000' },
              ]}
            >
              연세메일
            </Text>
          )}
          <TextInput
            placeholder="연세메일"
            style={[
              styles.input,
              { borderColor: isEmailValid ? '#D9D9D9' : '#CC0000' },
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailTouched(true);
            }}
            onBlur={() => checkEmail(email)}
            onFocus={() => setEmailTouched(false)}
          />
          <Text style={styles.emailFix}>@yonsei.ac.kr</Text>
        </View>
        {!isEmailValid && (
          <Text style={styles.errorText}>올바른 이메일 형식이 아닙니다.</Text>
        )}
      </View>
      <View style={styles.mailPw}>
        <View
          style={[
            styles.inputContainer,
            !isPasswordValid && styles.invalidInputContainer,
          ]}
        >
          <Image
            source={require('../../assets/pw.png')}
            style={[
              styles.image,
              { display: passwordTouched ? 'none' : 'flex' },
            ]}
            resizeMode="contain"
          />
          {(passwordTouched || password) && (
            <Text
              style={[
                styles.label,
                { color: isPasswordValid ? '#D9D9D9' : '#CC0000' },
              ]}
            >
              비밀번호
            </Text>
          )}
          <TextInput
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry={!showPassword}
            style={[
              styles.input,
              { borderColor: isPasswordValid ? '#D9D9D9' : '#CC0000' },
            ]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordTouched(true);
            }}
            onBlur={() => checkPassword(password)}
            onFocus={() => setPasswordTouched(false)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                showPassword
                  ? require('../../assets/pw_show.png')
                  : require('../../assets/pw_nshow.png')
              }
              style={styles.pwshow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {!isPasswordValid && (
          <Text style={styles.errorText}>
            비밀번호는 최소 6자 이상이어야 합니다.
          </Text>
        )}
      </View>
      <View style={styles.lostPw}>
        <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
          <Text style={styles.lostPwtext}>비밀번호를 잊었나요?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noAccount}>
        <Text>아직 계정이 없나요?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('JoinMail')}>
          <Text style={styles.join}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  login: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: -12,
  },
  mailPw: {
    marginBottom: '8%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#D9D9D9',
    paddingHorizontal: 10,
    height: 47,
  },
  invalidInputContainer: {
    borderColor: '#CC0000',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  emailFix: {
    fontSize: 15,
    marginLeft: 8,
  },
  pwshow: {
    width: 24,
    height: 24,
  },
  label: {
    position: 'absolute',
    top: -5,
    left: 15,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
  },
  lostPw: {
    marginLeft: '10%',
    marginTop: -14,
  },
  lostPwtext: {
    textDecorationLine: 'underline',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: '10%',
  },
  buttonContainer: {
    marginTop: '58%',
    alignItems: 'center',
  },
  loginButton: {
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
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  join: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  errorText: {
    fontSize: 12,
    color: '#CC0000',
    marginLeft: 10,
    marginTop: 6,
  },
});

export default Login;
