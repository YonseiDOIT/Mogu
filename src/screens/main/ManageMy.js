import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import ManageMyHeader from '../../components/ManageMyHeader';
import axios from 'axios'
import { BASE_URL } from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ManageMy = ({ navigation }) => {
  const [myOngoingGroupBuys, setMyOngoingGroupBuys] = useState([]);
  const fetchOngoingGroupBuys = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/products/seller/ongoing`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setMyOngoingGroupBuys(response.data); // 데이터를 상태에 저장
    } catch (err) {
      console.error('Error getProducts:', err)
    }
  };

  useEffect(() => {
    fetchOngoingGroupBuys();
    fetchMyParticipatedGroupBuys();
  }, []);

  const [myParticipatedGroupBuys, setMyParticipatedGroupBuys] = useState([]);
  const fetchMyParticipatedGroupBuys = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/participation/ongoing`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setMyParticipatedGroupBuys(response.data); // 데이터를 상태에 저장
      console.log("참여한거")
    } catch (err) {
      console.error('Error getProducts:', err)
    }
  };

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
              <Image source={{
                    uri: `${BASE_URL}/images/${item.productImage}`,
                  }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.status}>{item.status}</Text>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.minQuantity}>최소 수량 {item.mqq}개</Text>
                <Text style={styles.currentQuantity}>{item.remainingQty}/{item.qty}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내가 참여 중인 공구</Text>
          {myParticipatedGroupBuys.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{
                    uri: `${BASE_URL}/images/${item.productImage}`,
                  }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.status}>{item.status}</Text>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.quantity}>{item.participate_qty}개 ・ 총 {item.participate_price}원</Text>
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

