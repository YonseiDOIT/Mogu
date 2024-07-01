import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import ManageMyHeader from '../../components/ManageMyHeader';

const ManageMy = ({ navigation }) => {
  const [myOngoingGroupBuys, setMyOngoingGroupBuys] = useState([
    {
      id: 1,
      image: '/mnt/data/image.png', // 제품 이미지
      status: '모집 중',
      title: 'RAURI 오렌지주스 1500ml 팩',
      minQuantity: 15,
      currentQuantity: 12,
      maxQuantity: 20,
      location: '매지놀이터',
    },
    {
      id: 2,
      image: '/mnt/data/image.png',
      status: '구매 진행 중',
      title: '비건 대체육 부산물고기까스',
      minQuantity: 6,
      currentQuantity: 10,
      maxQuantity: 10,
      location: '연세플라자',
    },
    {
      id: 3,
      image: '/mnt/data/image.png',
      status: '구매 진행 중',
      title: '알러지 고급 휴지 곽티슈 200매',
      minQuantity: 8,
      currentQuantity: 9,
      maxQuantity: 10,
      location: '매지놀이터',
    },
  ]);

  const [myParticipatedGroupBuys, setMyParticipatedGroupBuys] = useState([
    {
      id: 1,
      image: '/mnt/data/image.png',
      status: '모집 중',
      title: '비건 대체육 부산물고기까스',
      quantity: 1,
      totalPrice: 12900,
      location: '연세플라자',
    },
    {
      id: 2,
      image: '/mnt/data/image.png',
      status: '구매 진행 중',
      title: '알러지 고급 휴지 곽티슈 200매',
      quantity: 1,
      totalPrice: 8700,
      location: '기타',
    },
  ]);

  return (
    <View style={styles.container}>
      <ManageMyHeader />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            내가 진행중인 공구 {myOngoingGroupBuys.length}/3
          </Text>
          {myOngoingGroupBuys.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.status}>{item.status}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.minQuantity}>최소 수량 {item.minQuantity}개</Text>
                <Text style={styles.currentQuantity}>{item.currentQuantity}/{item.maxQuantity}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내가 참여 중인 공구</Text>
          {myParticipatedGroupBuys.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.status}>{item.status}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.quantity}>1개 ・ 총 {item.totalPrice}원</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productCard: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  status: {
    color: 'green',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  minQuantity: {
    marginBottom: 4,
  },
  currentQuantity: {
    marginBottom: 4,
  },
  location: {
    color: '#555',
  },
  quantity: {
    marginBottom: 4,
  },
});

export default ManageMy;
