import React, { useRef, useState } from 'react';
import { Animated, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FAQHeader from '../../components/FAQHeader';

const ResetPassword = () => {
  const [expanded1, setExpanded1] = useState(false);
  const animation1 = useRef(new Animated.Value(0)).current;

  const [expanded2, setExpanded2] = useState(false);
  const animation2 = useRef(new Animated.Value(0)).current;

const [expanded3, setExpanded3] = useState(false);
  const animation3 = useRef(new Animated.Value(0)).current;

  const toggleDropdown1 = () => {
    setExpanded1(!expanded1);
    Animated.timing(animation1, {
      toValue: expanded1 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate1 = animation1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

  const toggleDropdown2 = () => {
    setExpanded2(!expanded2);
    Animated.timing(animation2, {
      toValue: expanded2 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate2 = animation2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

    const toggleDropdown3 = () => {
    setExpanded3(!expanded3);
    Animated.timing(animation3, {
      toValue: expanded2 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate3 = animation3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

  return (
    <View style={styles.container}>
      <FAQHeader />
      <View style={styles.main_notification}>
        <Text style={styles.main_text}>자주 묻는 질문</Text>
      </View>

      <View style={styles.additional_notification}>
        <View style={styles.Notification_title}>
          <Text style={styles.resetPw}>
            <Image source={require('../../assets/Q.png')} style={styles.image} />
            공구에 참여하면 어떻게 결제가 이루어지나요?
          </Text>
          <TouchableOpacity onPress={toggleDropdown1} style={styles.button}>
            <Image style={styles.toggleDropdown} source={expanded1 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate1 }]}>
          {expanded1 && (
            <Text style={styles.text}>
              그걸 왜 저한테 물어요?
            </Text>
          )}
        </Animated.View>
      </View>

      <View style={styles.additional_notification}>
        <View style={styles.Notification_title}>
          <Text style={styles.resetPw}>
            <Image source={require('../../assets/Q.png')} style={styles.image} />
            참여자가 오픈채팅을 확인하지 않아요
          </Text>
          <TouchableOpacity onPress={toggleDropdown2} style={styles.button}>
            <Image style={styles.toggleDropdown} source={expanded2 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate2 }]}>
          {expanded2 && (
            <Text style={styles.text}>
              그걸 왜 저한테 물어요?
            </Text>
          )}
        </Animated.View>
      </View>

            <View style={styles.additional_notification}>
        <View style={styles.Notification_title}>
          <Text style={styles.resetPw}>
            <Image source={require('../../assets/Q.png')} style={styles.image} />
          휴대전화를 바꿔서 로그인을 다시 해야해요
          </Text>
          <TouchableOpacity onPress={toggleDropdown3} style={styles.button}>
            <Image style={styles.toggleDropdown} source={expanded3 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate3 }]}>
          {expanded3 && (
            <Text style={styles.text}>
              그걸 왜 저한테 물어요?
            </Text>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main_notification: {
    marginTop: '10%',
    width: '90%',
    marginLeft: '5%',
    height: 40,
  },
  main_text: {
    fontSize: 20,
    fontWeight: '900',
  },
  additional_notification: {
    width: '90%',
    marginLeft: '5%',
    // height 속성을 제거하여 자동으로 조절되도록 함
  },
  image: {
    width: 13,
    height: 15,
    marginRight: '2%',
    resizeMode: 'contain',
  },
  button: {
    marginLeft: '2%',
    top: 4,
  },
  date: {
    color: '#777777',
  },
  resetPw: {
    fontSize: 17,
    fontWeight: '300',
    marginTop:20,
    marginBottom: 5,
  },
  description: {
    width: '100%',
    marginTop: 10,
    fontSize: 13,
    marginBottom: -12,
  },
  toggleDropdown: {
    resizeMode: 'contain',
    width: 13,
    height: 13,
  },
  Notification_title: {
    flexDirection: 'row',
  },
  dropdown: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
  },
  text: {
    padding: 10,
  },
});

export default ResetPassword;
