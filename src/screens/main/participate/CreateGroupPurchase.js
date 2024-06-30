import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CreateGroupPurchaseHeader from '../../../components/CreateGroupPurchaseHeader';
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';

const CreateGroupPurchase = ({ navigation }) => {
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [myQuantity, setmyQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unitQuantity, setUnitQuantity] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(new Date());
  const [text, setText] = useState('');
  const [category, setCategory] = useState(''); 
  const [otherCategory, setOtherCategory] = useState('');
  const webviewRef = useRef(null);
  const [location, setLocation] = useState({
    latitude: 37.2770,
    longitude: 127.9025,
    latitudeDelta: 0.0019,
    longitudeDelta: 0.0019,
  });
  const [markerLocation, setMarkerLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState('연세플라자');
  const mapRef = useRef(null);

  const handlePlaceSelect = (place) => {
    let newLocation;
    setSelectedPlace(place);

    switch (place) {
      case '연세플라자':
        newLocation = {
          latitude: 37.2770,
          longitude: 127.9025,
          latitudeDelta: 0.0019,
          longitudeDelta: 0.0019,
        };
        setMarkerLocation(null);
        break;
      case '연탄불고기':
        newLocation = {
          latitude: 37.2750,
          longitude: 127.9072,
          latitudeDelta: 0.0019,
          longitudeDelta: 0.0019,
        };
        setMarkerLocation(null);
        break;
      case '매지놀이터':
        newLocation = {
          latitude: 37.2787,
          longitude: 127.9102,
          latitudeDelta: 0.0019,
          longitudeDelta: 0.0019,
        };
        setMarkerLocation(null);
        break;
      case '기타':
        newLocation = {
          latitude: 37.2780,
          longitude: 127.9101,
          latitudeDelta: 0.0019,
          longitudeDelta: 0.0019,
        };
        setMarkerLocation(null);
        break;
      default:
        newLocation = location;
    }

    setLocation(newLocation);
    mapRef.current.animateToRegion(newLocation, 1000);
  };

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

  const handleConfirmDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  const handleConfirmTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setEndTime(currentTime);
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
          <Text style={styles.label}>분류</Text>
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.button, category === '물,음료' && styles.activeButton]} 
              onPress={() => setCategory('물,음료')}
            >
              <Text style={[category === '물,음료' && styles.activeText]}>물,음료</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, category === '과일' && styles.activeButton]} 
              onPress={() => setCategory('과일')}
            >
              <Text style={[category === '과일' && styles.activeText]}>과일</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, category === '유제품' && styles.activeButton]} 
              onPress={() => setCategory('유제품')}
            >
              <Text style={[category === '유제품' && styles.activeText]}>유제품</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, category === '건강식' && styles.activeButton]} 
              onPress={() => setCategory('건강식')}
            >
              <Text style={[category === '건강식' && styles.activeText]}>건강식</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, category === '위생용품' && styles.activeButton]} 
              onPress={() => setCategory('위생용품')}
            >
              <Text style={[category === '위생용품' && styles.activeText]}>위생용품</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, category === '기타' && styles.activeButton]} 
              onPress={() => setCategory('기타')}
            >
              <Text style={[category === '기타' && styles.activeText]}>기타</Text>
            </TouchableOpacity>
          </View>
          {category === '기타' && (
            <TextInput 
              style={[styles.input, { marginTop: 10 }]} 
              placeholder="기타 내용을 입력하세요" 
              value={otherCategory} 
              onChangeText={setOtherCategory}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>가격</Text>
          <Text style={{ color: '#777777', fontSize: 13, fontWeight: 300, marginTop: 5, marginBottom: 7 }}>모집 마감 이후 결제할 전체 수량을 작성해주세요.</Text>
          <View style={styles.row}>
            <Text style={[styles.rowText, { marginTop: 10 }]}>모두 합하여</Text>
            <TextInput 
              style={[styles.input, { width: 60, height: 35 }]} 
              placeholder="0"
              value={totalQuantity} 
              onChangeText={setTotalQuantity}
              keyboardType="numeric"
            />
            <Text style={[styles.rowText, { marginTop: 10 }]}>개, 총</Text>
            <TextInput 
              style={[styles.input, { width: 80, height: 35 }]} 
              placeholder="0,000" 
              value={totalPrice} 
              onChangeText={setTotalPrice}
              keyboardType="numeric"
            />
            <Text style={[styles.rowText, { marginTop: 10 }]}>원</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, height: 55, borderBottomColor: '#DEDEDE', borderBottomWidth: 1 }}>
            <Text style={[styles.rowText, { marginTop: 0 }]}>저는 여기서</Text>
            <TextInput 
              style={[styles.input, { width: 60, height: 35 }]} 
              placeholder="0"
              value={myQuantity}
              onChangeText={setmyQuantity}
              keyboardType="numeric"
            />
            <Text style={[styles.rowText, { marginTop: 0 }]}>개 가져갈게요!</Text>
          </View>
          <Text style={{ marginTop: 10, fontSize: 15, fontWeight: 600 }}>
            {`-> 1개당 `}<Text style={{ color: '#48BD00' }}>{(totalPrice && totalQuantity) ? (totalPrice / totalQuantity).toFixed(0) : '00,000'}</Text>{`원으로 `}<Text style={{ color: '#48BD00' }}>{totalQuantity ? (totalQuantity-myQuantity) : '00'}</Text>{`개를 판매합니다.`}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>공구 마감 시간</Text>
          <View style={styles.dateTimeContainer}>
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              minimumDate={new Date()}
              maximumDate={new Date(minimumDate.getTime() + 7 * 24 * 60 * 60 * 1000)}
              onChange={handleConfirmDate}
              style={[styles.dateTimePicker]}
            />
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={handleConfirmTime}
              style={styles.dateTimePicker}
            />
          </View>
          <Text style={{ color: '#777777', fontSize: 13, fontWeight: 300, marginTop: 5, marginBottom: 7 }}>등록일을 포함하여 최소 2일부터 최대 7일 동안 신청 받을 수 있습니다.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>최소 공구 수량</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#75C743', fontSize: 15, fontWeight: 600 }}>{unitQuantity ? unitQuantity : (totalQuantity-myQuantity)}</Text>
            <Text style={{ fontSize: 15, fontWeight: 600 }}>개 중</Text>
            <TextInput 
              style={[styles.input, { width: 70, height: 35, marginLeft: 10, marginRight: 10 }]} 
              placeholder="0"
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 15, fontWeight: 600 }}>개</Text>
          </View>
          <Text style={{ color: '#777777', fontSize: 13, fontWeight: 300, marginTop: 5, marginBottom: 7 }}>아래의 개수 이상 참여자가 모이면 목표수량이 미달되어도 공구가 계속 진행됩니다. 내 참여 수량을 포함해서 설정해주세요.</Text>
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
          <Text style={styles.label}>수령 장소</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, selectedPlace === '연세플라자' && styles.activeButton]}
              onPress={() => handlePlaceSelect('연세플라자')}
            >
              <Text style={[selectedPlace === '연세플라자' && styles.activeText]}>연세플라자</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedPlace === '연탄불고기' && styles.activeButton]}
              onPress={() => handlePlaceSelect('연탄불고기')}
            >
              <Text style={[selectedPlace === '연탄불고기' && styles.activeText]}>연탄불고기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedPlace === '매지놀이터' && styles.activeButton]}
              onPress={() => handlePlaceSelect('매지놀이터')}
            >
              <Text style={[selectedPlace === '매지놀이터' && styles.activeText]}>매지놀이터</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedPlace === '기타' && styles.activeButton]}
              onPress={() => handlePlaceSelect('기타')}
            >
              <Text style={[selectedPlace === '기타' && styles.activeText]}>기타</Text>
            </TouchableOpacity>
          </View>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={location}
            onPress={handleMapPress}
          >
            {markerLocation && <Marker coordinate={markerLocation} />}
            {!markerLocation && <Marker coordinate={location} />}
          </MapView>
          <Text style={{ marginTop: 10, color: '#777777', fontSize: 13, fontWeight: 300 }}>
            {selectedPlace === '기타' ? '직접 선택하기' : `${selectedPlace} 일대`}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>카카오톡 오픈채팅 링크</Text>
          <TextInput style={styles.input} placeholder="http://카카오톡.openchat" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Maintest')} style={styles.submitButton}>
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
