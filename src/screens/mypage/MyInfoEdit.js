import React from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import EditHeader from '../../components/EditHeader'
import { TextInput } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

const MyInfoEdit = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <EditHeader/>
        <View style={styles.mainedit}>
            <View style={styles.mailPw}>
                <Text style={styles.mailPassword}>아이디</Text>
                <TextInput
                placeholder="kimmaegi09@ yonsei.ac.kr"
                editable={false}
                style={styles.emailinput}
                ></TextInput>
            </View>

                <View style={styles.mailPw}>
                <Text style={styles.mailPassword}>*닉네임</Text>
                <TextInput
                placeholder="한글 및 숫자 10자 이하"
                style={styles.input}
                maxLength={10}
                ></TextInput>
            </View>

            <View style={styles.mailPw}>
                <Text style={styles.mailPassword}>*전화번호</Text>
                <TextInput
                placeholder="010-1234-1234"
                style={styles.input}
                ></TextInput>
            </View>

                <View style={styles.mailPw}>
                <Text style={styles.mailPassword}>*비밀번호</Text>
                <TextInput
                placeholder="password"
                secureTextEntry={true}
                style={styles.input}
                ></TextInput>
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('MyInfoEditEnd')}
            >
            <Text style={styles.buttonText}>수정하기</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    height:'100%'
  },
    mainedit:{
        marginTop:70
    },
    mailPw: {
    marginBottom: '8%',
    marginLeft: '10%',
  },

  mailPassword: {
    color: '#777777',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '90%',
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },
    emailinput: {
    height: 40,
    borderBottomColor: '#B3B3B3',
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '90%',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: '28%',
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

})
export default MyInfoEdit
