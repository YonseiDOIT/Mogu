import React, { useRef, useState } from 'react';
import { Animated, View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import NotificationHeader from '../../components/NotificationHeader'

const ResetPassword = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

  return (
    <View style={styles.container}>
      <NotificationHeader/>
      <View style={styles.main_notification}>
        <Text style={styles.resetPw}><Image source={require('../../assets/bookmark.png')} style={styles.image}/>메인 공지</Text>
        <Text style={styles.date}>2024-05-10</Text>

        <Text style={styles.description}>
            언녕하세요 모두의 공구, 모구 입니다:D{"\n"}
            {"\n"}
            링크 입력시 링크와 다른 제춤의 이미지가 뜨는 오류가 수정되었습니다. 오늘도 모구를 이용해주셔서 감사합니다.
        </Text>
      </View>
        <View style={styles.additional_notification}>
        <View style={styles.Notification_title}>
            <Text style={styles.resetPw}>추가 공지</Text>
            <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
                <Image style={styles.toggleDropdown} source={expanded ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
            </TouchableOpacity>
        </View>
        <Text style={styles.date}>2024-05-10</Text>
        <Animated.View style={[styles.dropdown, { height: heightInterpolate }]}>
        {expanded && (
          <Text style={styles.text}>
            안녕하세요 모두의 공구, 모구입니다 :D{"\n"}
            소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 
        </Text>
        )}
      </Animated.View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main_notification: {
    marginTop: '10%',
    width:'90%',
    marginLeft:'5%',
    height:130,
    borderBottomColor:'#DEDEDE',
    borderBottomWidth:1
  },
    additional_notification: {
    marginTop: '5%',
    width:'90%',
    marginLeft:'5%',
    height:130,
  },
  image:{
    width:13,
    height:15,
    marginRight:'2%',
    resizeMode:'contain'
  },
  button:{   
    marginLeft:'75%'   
},
  date:{
    color:'#777777'
  },
  resetPw: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },

  description: {
    width:'100%',
    marginTop:10,
    fontSize: 13,
    marginBottom: -12,
  },
    toggleDropdown:{
        resizeMode:'contain',
        width:13,
        height:13
    },
    Notification_title:{
        flexDirection:'row',
    },
  dropdown: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop:15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor:'#DEDEDE',
    borderBottomWidth:1
  },
  text: {
    padding: 10,
  },
})

export default ResetPassword
