import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ManageMyHeader = ({ showInfo }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <Pressable style={styles.backButton}>
        <Text style={styles.headment1}>공구 관리</Text>
      </Pressable>
      <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate('FinishedMy')}>
        <Text style={styles.headment1}>종료된 공구</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 100,
    paddingTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  infoButton: {
    position: 'absolute',
    top: 60,
    right: 10,
  },
  infoIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    position: 'absolute',
    marginLeft: '7%',
    marginTop: '16%',
  },
  image: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  headment1: {
    position: 'absolute',
    fontWeight: '700',
    marginTop: '0%',
    width: 200,
    left: 40,
    fontSize: 20,
  },
    headment2: {
    position: 'absolute',
    fontWeight: '700',
    marginTop: '0%',
    width: 200,
    left: 40,
    fontSize: 15,
  },
});

export default ManageMyHeader;
