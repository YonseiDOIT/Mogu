import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View,Image,Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import PasswordEditHeader from '../../components/PasswordEditHeader'

const Passwordedit = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSecureEntry, setIsSecureEntry] = useState(true);


  const lengthcheck = (text) => {
    setPassword(text);
    if (text.length === 0) {
      setMessage('');
      setIsButtonDisabled(true);
    } else if (text.length < 7) {
      setMessage('비밀번호는 7자리 이상이어야 해요!');
      setIsButtonDisabled(true);
    } else {
      setMessage('');
      setIsButtonDisabled(false);
    }
  };

  const overlapcheck = () => {
    if (password === 'newpass1234!') {
      setMessage('이전과 동일한 비밀번호에요! 새로운 비밀번호를 입력해주세요!');
    } else {
      navigation.navigate('Editend');
    }
  };

    const toggleSecureTextEntry = () => {
    setIsSecureEntry(!isSecureEntry);
  };

  return (
    <View style={styles.container}>
      <PasswordEditHeader />
      <View style={styles.mail}>
        <View style={[
            styles.id,
            password.length === 0 ? styles.normalborder : password === 'newpass1234!' ? styles.errorborder : styles.successborder
          ]}>
          <Image
            source={require('../../assets/lock.png')}
            style={[styles.idmail, { height: 21, top: 10 }]}
          />
          <View style={[styles.idinfo, { left: 15 }]}>
            <TextInput
              style={styles.usernametext}
              placeholder='7자리 이상 영문/숫자 혼합'
              secureTextEntry={isSecureEntry}
              value={password}
              onChangeText={lengthcheck}
              editable={true}
            />
        </View>
        <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.toggleButton}>
          <Image
            source={isSecureEntry ? require('../../assets/hide.png') : require('../../assets/show.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.overlapped,
            password === 'newpass1234!' ? styles.error : styles.success,
          ]}
        >
          {message}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.contButton,
            isButtonDisabled ? styles.disabledButton : null,
          ]}
          onPress={overlapcheck} 
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>수정하기</Text>
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
  mail:{
    marginTop:180
  },
  idmail: {
    width: 30,
    resizeMode: 'contain',
    marginLeft: 10,
    top: 1,
  },
  infoimage: {
    width: 20,
    height: 12,
    resizeMode: 'contain',
    marginLeft: -30,
    bottom: -15,
  },
  image: {
    marginTop: -30,
    width: '80%',
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: -50,
  },
    buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  maininfo: {
    height: '40%',
    paddingTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  username: {
    flexDirection: 'row',
    width: '50%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 40,
    marginLeft: '10%',
  },
  usernametext: {
    marginLeft: 10,
    fontWeight: '600',
  },
  id: {
    flexDirection: 'row',
    borderRadius: 14,
    height: 47,
    width: '80%',
    borderWidth: 1,
    marginBottom: 21,
    marginLeft: '10%',
  },
  idinfo: {
    flexDirection: 'row',
    width: '88%',
    marginLeft: 0,
  },
  Pressable1: {
    marginTop: 25,
    marginLeft: 15,
  },
  Pressable2: {
    marginTop: 15,
    marginLeft: 15,
  },
  buttonContainer: {
    marginTop: '81.5%',
    alignItems: 'center',
  },
  contButton: {
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
  disabledButton: {
    backgroundColor: '#C4C4C4',
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  overlapped: {
    fontSize: 12,
    marginTop:-10,
    marginLeft: 40,
  },
  error: {
    color: 'red',
  },
  success: {
    color: '#4EAA16',
  },
  normalborder:{
    borderColor: '#C4C4C4',
  },
  errorborder:{
    borderColor:'red'
  },
  successborder:{
    borderColor:'#4EAA16'
  },
  join: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  icon: {
    position:'absolute',
    right:20,
    top:12,
    width:20,
    height: 20,
    resizeMode:'contain'
  },
});

export default Passwordedit;
