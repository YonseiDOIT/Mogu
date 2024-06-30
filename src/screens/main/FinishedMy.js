import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import FinishedMyHeader from '../../components/FinishedMyHeader';

const FinishedMy = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('ongoing'); // 'ongoing' or 'participated'

  const ongoingGroupBuys = [
    {
      id: 1,
      image: '/mnt/data/image.png',
      status: '종료',
      title: '(진행한) 비건 대체육 부산물고기까스',
      minQuantity: 8,
      currentQuantity: 3,
      maxQuantity: 10,
      location: '연세플라자',
    },
    {
      id: 2,
      image: '/mnt/data/image.png',
      status: '취소',
      title: '(진행한) 비건 대체육 부산물고기까스',
      minQuantity: 8,
      currentQuantity: 3,
      maxQuantity: 10,
      location: '연세플라자',
    },
  ];

  const participatedGroupBuys = [
    {
      id: 1,
      image: '/mnt/data/image.png',
      status: '종료',
      title: '(참여한) 비건 대체육 부산물고기까스',
      quantity: 1,
      totalPrice: 12900,
      location: '연세플라자',
    },
    {
      id: 2,
      image: '/mnt/data/image.png',
      status: '취소',
      title: '(참여한) 비건 대체육 부산물고기까스',
      quantity: 1,
      totalPrice: 12900,
      location: '연세플라자',
    },
  ];

  const renderGroupBuys = (groupBuys) => {
    return groupBuys.map((item) => (
      <View key={item.id} style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={item.status === '종료' ? styles.statusCompleted : styles.statusCancelled}>{item.status}</Text>
          <Text style={styles.title}>{item.title}</Text>
          {item.minQuantity ? (
            <Text style={styles.minQuantity}>최소 수량 {item.minQuantity}개</Text>
          ) : (
            <Text style={styles.quantity}>{item.quantity}개 ・ 총 {item.totalPrice}원</Text>
          )}
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <FinishedMyHeader />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'ongoing' && styles.activeTab]}
          onPress={() => setSelectedTab('ongoing')}
        >
          <Text style={[styles.tabText, selectedTab === 'ongoing' && styles.activeTabText]}>내가 진행한 공구</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'participated' && styles.activeTab]}
          onPress={() => setSelectedTab('participated')}
        >
          <Text style={[styles.tabText, selectedTab === 'participated' && styles.activeTabText]}>내가 참여한 공구</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          {selectedTab === 'ongoing' ? renderGroupBuys(ongoingGroupBuys) : renderGroupBuys(participatedGroupBuys)}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 15,
    marginLeft:10
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#77c146',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#77c146',
  },
  tabText: {
    fontSize: 14,
    color: '#77c146',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
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
  statusCompleted: {
    color: 'green',
    marginBottom: 4,
  },
  statusCancelled: {
    color: 'red',
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
  quantity: {
    marginBottom: 4,
  },
  location: {
    color: '#555',
  },
});

export default FinishedMy;
