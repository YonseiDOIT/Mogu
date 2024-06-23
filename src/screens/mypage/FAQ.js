import React, { useRef, useState } from 'react';
import { Animated, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FAQHeader from '../../components/FAQHeader';

const FAQ = () => {
  const [expanded1, setExpanded1] = useState(false);
  const animation1 = useRef(new Animated.Value(0)).current;

  const [expanded2, setExpanded2] = useState(false);
  const animation2 = useRef(new Animated.Value(0)).current;

  const [expanded3, setExpanded3] = useState(false);
  const animation3 = useRef(new Animated.Value(0)).current;

  const [expanded4, setExpanded4] = useState(false);
  const animation4 = useRef(new Animated.Value(0)).current;

  const [expanded5, setExpanded5] = useState(false);
  const animation5 = useRef(new Animated.Value(0)).current;

  const [expanded6, setExpanded6] = useState(false);
  const animation6 = useRef(new Animated.Value(0)).current;

  const [expanded7, setExpanded7] = useState(false);
  const animation7 = useRef(new Animated.Value(0)).current;

  const [expanded8, setExpanded8] = useState(false);
  const animation8 = useRef(new Animated.Value(0)).current;

  const [expanded9, setExpanded9] = useState(false);
  const animation9 = useRef(new Animated.Value(0)).current;

  const [expanded10, setExpanded10] = useState(false);
  const animation10 = useRef(new Animated.Value(0)).current;

  const [expanded11, setExpanded11] = useState(false);
  const animation11 = useRef(new Animated.Value(0)).current;

  const [expanded12, setExpanded12] = useState(false);
  const animation12 = useRef(new Animated.Value(0)).current;

  const [activeTab, setActiveTab] = useState('login');


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
      toValue: expanded3 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate3 = animation3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

      const toggleDropdown4 = () => {
    setExpanded4(!expanded4);
    Animated.timing(animation4, {
      toValue: expanded4 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate4 = animation4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

      const toggleDropdown5 = () => {
    setExpanded5(!expanded5);
    Animated.timing(animation5, {
      toValue: expanded5 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate5 = animation5.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

        const toggleDropdown6 = () => {
    setExpanded6(!expanded6);
    Animated.timing(animation6, {
      toValue: expanded6 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate6 = animation6.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

  const toggleDropdown7 = () => {
    setExpanded7(!expanded7);
    Animated.timing(animation7, {
      toValue: expanded7 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate7 = animation7.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

        const toggleDropdown8 = () => {
    setExpanded8(!expanded8);
    Animated.timing(animation8, {
      toValue: expanded8 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate8 = animation8.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

        const toggleDropdown9 = () => {
    setExpanded9(!expanded9);
    Animated.timing(animation9, {
      toValue: expanded9 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate9 = animation9.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

        const toggleDropdown10 = () => {
    setExpanded10(!expanded10);
    Animated.timing(animation10, {
      toValue: expanded10 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate10 = animation10.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

        const toggleDropdown11 = () => {
    setExpanded11(!expanded11);
    Animated.timing(animation11, {
      toValue: expanded11 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate11 = animation11.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });
        const toggleDropdown12 = () => {
    setExpanded12(!expanded12);
    Animated.timing(animation12, {
      toValue: expanded12 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate12 = animation12.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 125], // 드롭다운의 최대 높이
  });

const renderContent = () => {
    switch (activeTab) {
      case 'login':
        return (
          <View>
            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  로그인 관련 질문 1
                </Text>
                <TouchableOpacity onPress={toggleDropdown4} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded4 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate4 }]}>
                {expanded4 && (
                  <Text style={styles.text}>
                    로그인 관련 질문 1의 내용입니다.로그인 관련 질문 1의 내용입니다.로그인 관련 질문 1의 내용입니다.로그인 관련 질문 1의 내용입니다.로그인 관련 질문 1의 내용입니다.로그인 관련 질문 1의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>

            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  로그인 관련 질문 2
                </Text>
                <TouchableOpacity onPress={toggleDropdown5} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded5 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate5 }]}>
                {expanded5 && (
                  <Text style={styles.text}>
                    로그인 관련 질문 2의 내용입니다.로그인 관련 질문 2의 내용입니다.로그인 관련 질문 2의 내용입니다.로그인 관련 질문 2의 내용입니다.로그인 관련 질문 2의 내용입니다.로그인 관련 질문 2의 내용입니다.로그인 관련 질문 2의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>
          </View>
        );
      case 'participation':
        return (
          <View>
            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  공구참여 관련 질문 1
                </Text>
                <TouchableOpacity onPress={toggleDropdown6} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded6 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate6 }]}>
                {expanded6 && (
                  <Text style={styles.text}>
                    공구참여 관련 질문 1의 내용입니다.공구참여 관련 질문 1의 내용입니다.공구참여 관련 질문 1의 내용입니다.공구참여 관련 질문 1의 내용입니다.공구참여 관련 질문 1의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>

            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  공구참여 관련 질문 2
                </Text>
                <TouchableOpacity onPress={toggleDropdown7} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded7 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate7 }]}>
                {expanded7 && (
                  <Text style={styles.text}>
                    공구참여 관련 질문 2의 내용입니다.공구참여 관련 질문 2의 내용입니다.공구참여 관련 질문 2의 내용입니다.공구참여 관련 질문 2의 내용입니다.공구참여 관련 질문 2의 내용입니다.공구참여 관련 질문 2의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>
          </View>
        );
      case 'initiation':
        return (
          <View>
            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  공구 주최 관련 질문 1
                </Text>
                <TouchableOpacity onPress={toggleDropdown8} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded8 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate8 }]}>
                {expanded8 && (
                  <Text style={styles.text}>
                    공구 주최 관련 질문 1의 내용입니다.공구 주최 관련 질문 1의 내용입니다.공구 주최 관련 질문 1의 내용입니다.공구 주최 관련 질문 1의 내용입니다.공구 주최 관련 질문 1의 내용입니다.공구 주최 관련 질문 1의 내용입니다.공구 주최 관련 질문 1의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>

            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  공구 주최 관련 질문 2
                </Text>
                <TouchableOpacity onPress={toggleDropdown9} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded9 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate9 }]}>
                {expanded9 && (
                  <Text style={styles.text}>
                    공구 주최 관련 질문 2의 내용입니다.공구 주최 관련 질문 2의 내용입니다.공구 주최 관련 질문 2의 내용입니다.공구 주최 관련 질문 2의 내용입니다.공구 주최 관련 질문 2의 내용입니다.공구 주최 관련 질문 2의 내용입니다.공구 주최 관련 질문 2의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>
          </View>
        );
      case 'others':
        return (
          <View>
            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  기타 질문 1
                </Text>
                <TouchableOpacity onPress={toggleDropdown10} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded10 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate10 }]}>
                {expanded10 && (
                  <Text style={styles.text}>
                   기타 질문 1의 내용입니다.기타 질문 1의 내용입니다.기타 질문 1의 내용입니다.기타 질문 1의 내용입니다.기타 질문 1의 내용입니다.기타 질문 1의 내용입니다.기타 질문 1의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>

            <View style={styles.additional_notification}>
              <View style={styles.Notification_title}>
                <Text style={styles.resetPw}>
                  <Image source={require('../../assets/Q.png')} style={styles.image} />
                  기타 질문 2
                </Text>
                <TouchableOpacity onPress={toggleDropdown11} style={styles.button}>
                  <Image style={styles.toggleDropdown} source={expanded11 ? require('../../assets/toggledown.png') : require('../../assets/toggleup.png')} />
                </TouchableOpacity>
              </View>
              <Animated.View style={[styles.dropdown, { maxHeight: heightInterpolate11 }]}>
                {expanded11 && (
                  <Text style={styles.text}>
                    기타 질문 2의 내용입니다.기타 질문 2의 내용입니다.기타 질문 2의 내용입니다.기타 질문 2의 내용입니다.기타 질문 2의 내용입니다.기타 질문 2의 내용입니다.
                  </Text>
                )}
              </Animated.View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  

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
              내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
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
              내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
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
              내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
            </Text>
          )}
        </Animated.View>
      </View>

      <View style={styles.main_notification}>
        <Text style={styles.main_text}>자주 묻는 질문</Text>
      </View>

<View style={styles.categoryTabs}>
  <TouchableOpacity onPress={() => setActiveTab('login')}>
    <View style={[styles.categoryTab, activeTab === 'login' && styles.activeTab]}>
      <Text style={activeTab === 'login' && styles.activeTab}>로그인</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setActiveTab('participation')}>
    <View style={[styles.categoryTab, activeTab === 'participation' && styles.activeTab]}>
      <Text style={activeTab === 'participation' && styles.activeTab}>공구 참여</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setActiveTab('initiation')}>
    <View style={[styles.categoryTab, activeTab === 'initiation' && styles.activeTab]}>
      <Text style={activeTab === 'initiation' && styles.activeTab}>공구 주최</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setActiveTab('others')}>
    <View style={[styles.categoryTab, activeTab === 'others' && styles.activeTab]}>
      <Text style={activeTab === 'others' && styles.activeTab}>기타</Text>
    </View>
  </TouchableOpacity>
</View>


      {renderContent()}
      </View>  );
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
    position:'absolute',
    marginLeft: '95%',
    top: 23,
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
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'horizontal',
    marginVertical: 0,
    left:'2%',
  },
  categoryTab: {
    fontSize: 15,
    width:90,
    height:40,
    backgroundColor: '#fff',
    borderColor:'#DEDEDE',
    borderWidth:1,
    fontWeight:600,
    textAlign: 'center', // Centers text horizontally
    justifyContent: 'center', // Centers text vertically (requires flex)
    alignItems: 'center', // Centers text vertically (requires flex)
    display: 'flex',
  },
  activeTab: {
    backgroundColor: '#75C743',
    color:'#fff'
  },
  
});

export default FAQ;
