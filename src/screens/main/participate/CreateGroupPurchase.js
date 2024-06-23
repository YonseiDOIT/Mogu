import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import CreateGroupPurchaseHeader from '../../../components/CreateGroupPurchaseHeader';

const CreateGroupPurchase = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CreateGroupPurchaseHeader />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.label}>상품명</Text>
          <TextInput style={styles.input} placeholder="RAUM 오렌지주스 1500ml 1팩" />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>구매 링크</Text>
          <TextInput style={styles.input} placeholder="https://www.example.com" />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>분류</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}><Text>식품</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>생활용품</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>디지털</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>기타</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>카테고리</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}><Text>과일/채소</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>음료</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>주방용품</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>기타</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>목표 금액</Text>
          <TextInput style={styles.input} placeholder="10000원" />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>모집 수량</Text>
          <TextInput style={styles.input} placeholder="10개" />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>종료 일자</Text>
          <TextInput style={styles.input} placeholder="2024년 9월 30일" />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>설명</Text>
          <TextInput style={styles.input} placeholder="여기에 설명을 입력하세요" />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>지도 위치</Text>
          <View style={styles.mapPlaceholder}>
            <Text>지도 표시</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>카카오톡 오픈채팅 링크</Text>
          <TextInput style={styles.input} placeholder="http://카카오톡.openchat" />
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>작성 완료</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: 130, // Adjust this value based on your header height
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
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
    backgroundColor: '#eee',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
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
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateGroupPurchase;
