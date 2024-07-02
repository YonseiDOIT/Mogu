import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EditGroupPurchaseHeader from '../../../components/EditGroupPurchaseHeader';
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';

const CreateGroupPurchase = ({ navigation }) => {
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const webviewRef = useRef(null);

  const mapRef = useRef(null);



  const handleMapPress = (e) => {
    if (selectedPlace === '기타') {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setMarkerLocation({ latitude, longitude });
    }
  };

  const handleLinkChange = (text) => {
    setLink(text);
    if (text.startsWith('http')) {
      setLoading(true);
      setTimeout(() => {
        webviewRef.current.injectJavaScript(`
          (function() {
            const ogImageMeta = document.querySelector('meta[property="og:image"]');
            if (ogImageMeta) {
              window.ReactNativeWebView.postMessage(ogImageMeta.getAttribute('content'));
            } else {
              const firstImg = document.querySelector('img');
              if (firstImg) {
                window.ReactNativeWebView.postMessage(firstImg.src);
              } else {
                window.ReactNativeWebView.postMessage('');
              }
            }
          })();
        `);
      }, 1500); // Delay to ensure the page loads
    } else {
      setImage('');
      setLoading(false);
    }
  };

  const handleWebViewMessage = (event) => {
    const imageUrl = event.nativeEvent.data;
    if (imageUrl) {
      setImage(imageUrl);
    } else {
      Alert.alert('Error', 'No image found');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CreateGroupPurchaseHeader />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.label}>상품명</Text>
          <TextInput style={styles.input} placeholder="오렌지주스 1500ml 1팩" />
        </View>
        <View style={styles.section}>
          <Text style={styles.label_link}>구매 링크</Text>
          <Text style={{ fontSize: 13, fontWeight: 200, marginBottom: 10 }}>링크를 올리면 자동으로 이미지가 연동돼요!</Text>          
          <View style={styles.linkContainer}>
            <TextInput 
              style={[styles.input, styles.linkInput]} 
              placeholder="https://www.example.com" 
              value={link} 
              onChangeText={handleLinkChange} 
            />
            {loading ? (
              <ActivityIndicator size="small" color="#75C743" />
            ) : image ? (
              <Image source={{ uri: image }} style={styles.thumbnail} />
            ) : null}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>공지</Text>
          <Text style={{ color: '#777777', fontSize: 13, fontWeight: 300, marginBottom: 7 }}>기존 가격, 제품의 단위(개당 ml등), 수령 예상 일자와 시간을 구체적으로 작성하면 더 효과적으로 공구 참여자를 모을 수 있어요.</Text>
          <TextInput style={styles.textInput}
            multiline={true}
            placeholder="여기에 설명을 입력하세요"
            onChangeText={setText}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>카카오톡 오픈채팅 링크</Text>
          <TextInput style={styles.input} placeholder="http://카카오톡.openchat" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>작성 완료</Text>
        </TouchableOpacity>
      </ScrollView>
      {link.startsWith('http') && (
        <WebView
          ref={webviewRef}
          source={{ uri: link }}
          onMessage={handleWebViewMessage}
          style={{ height: 0, width: 0 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onLoadEnd={() => setLoading(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingTop: 100, 
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label_link: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#75C743',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkInput: {
    flex: 1,
    marginRight: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  rowText: {
    top: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: '#75C743',
  },
  activeText: {
    color: '#fff',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    width:300
  },
  dateTimePicker: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',  // DateTimePicker와 일치하는 색상으로 설정
    borderRadius: 20,
    justifyContent: 'center',  // 가운데 정렬
  },
  textInput: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // 커서를 왼쪽 위에 고정
  },
});

export default CreateGroupPurchase;
