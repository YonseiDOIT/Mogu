import React, { useRef, useState } from 'react';
import { Animated, View, Text,Image, TouchableOpacity,Pressable,StyleSheet,Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import UserInfoHeader from '../../components/UserInfoHeader';

const MyInfo = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={Myinfo_styles.container}>
        <UserInfoHeader/>
            <View style={Myinfo_styles.mytrade}>
                <Text style={[Myinfo_styles.title, { marginTop: 40 }]}>나의 거래</Text>
                <Pressable style={Myinfo_styles.button}>
                    <Text style={Myinfo_styles.text}><Image style={Myinfo_styles.image}source={require('../../assets/shoppingbag.png')}/>종료/취소된 공구</Text>
                </Pressable>
            </View>
            <View style={[Myinfo_styles.mytrade, { borderBottomWidth:1,borderBottomColor:'#DEDEDE' }]}>
                <Text style={[Myinfo_styles.title, { marginTop: 10 }]}>모구 소식</Text>
                <Pressable style={Myinfo_styles.button} onPress={navigation.navigate('NotificationCheck')}>
                    <Text style={Myinfo_styles.text}><Image style={Myinfo_styles.image}source={require('../../assets/mail.png')}/>공지사항</Text>
                </Pressable>
                <Pressable style={Myinfo_styles.button}>
                    <Text style={Myinfo_styles.text}><Image style={Myinfo_styles.image}source={require('../../assets/message.png')}/>자주 묻는 질문</Text>
                </Pressable>
                <Pressable style={Myinfo_styles.button}>
                    <Text style={Myinfo_styles.text}><Image style={Myinfo_styles.image}source={require('../../assets/cs.png')}/>고객센터</Text>
                </Pressable>
            </View>
                <View style={Myinfo_styles.alarmtoggle}>
                    <Text style={[Myinfo_styles.text,{marginTop:4,fontWeight:700}]}>알림 수신 설정</Text>
                    <Switch style={Myinfo_styles.switch}
                        trackColor={{ false: "#767577", true: "#BFFF97" }}
                        thumbColor={isEnabled ? "#75C743" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}/>
                </View>            
    </View>
  )
}

const Myinfo_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mytrade:{
    marginLeft:'5%',
    width:'90%'
  },
  title:{
    fontSize:'17',
    fontWeight:'900',
    marginBottom:20
  },
  button:{
    flexDirection:'row',
    marginBottom:25
  },
  switch:{
    marginLeft:'55%'
  },
  alarmtoggle:{
    marginTop:'5%',
    flexDirection:'row',
    marginLeft:'5%',
    width:'90%'
  },
  text:{
    fontSize:'17',
  },
  image:{
    resizeMode:'contain',
    width:16,
    height:16,
    marginRight:15
  }
})

export default MyInfo
