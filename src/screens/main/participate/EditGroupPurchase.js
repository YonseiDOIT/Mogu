import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditGroupPurchaseHeader from '../../../components/EditGroupPurchaseHeader'

const EditGroupPurchase = ({ route, navigation }) => {
  const { itemId, itemTitle } = route.params

  const [link, setLink] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [chatUrl, setChatUrl] = useState('')
  const webviewRef = useRef(null)

  // Handle link change to get image from the link
  const handleLinkChange = (text) => {
    setLink(text)
    if (text.startsWith('http')) {
      setLoading(true)
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
        `)
      }, 1500) // Delay to ensure the page loads
    } else {
      setImage('')
      setLoading(false)
    }
  }

  // Handle receiving message from WebView (image URL)
  const handleWebViewMessage = (event) => {
    const imageUrl = event.nativeEvent.data
    if (imageUrl) {
      setImage(imageUrl)
    } else {
      Alert.alert('Error', 'No image found')
    }
    setLoading(false)
  }

  // Submit form data to the server
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('url', link) // 구매 링크
    formData.append('content', text) // 공지 내용
    formData.append('chatUrl', chatUrl) // 오픈채팅 링크

    // 이미지가 있으면 이미지 URL을 FormData에 추가
    if (image) {
      formData.append('imageUrl', image) // image에 웹에서 가져온 이미지 URL 사용
    }

    try {
      const token = await AsyncStorage.getItem('token')
      const response = await fetch(
        `${BASE_URL}/products/${itemId}/updateDetails`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      if (response.ok) {
        Alert.alert('Success', 'Group purchase updated successfully')
        navigation.navigate('TabNavigation') // Navigate after successful submission
      } else {
        const errorData = await response.json()
        Alert.alert(
          'Error',
          errorData.message || 'Failed to update group purchase'
        )
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <EditGroupPurchaseHeader />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.label}>상품명</Text>
          <TextInput
            style={styles.input}
            value={itemTitle} // Display itemTitle value
            editable={false} // Make it non-editable
            placeholder="오렌지주스 1500ml 1팩"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label_link}>구매 링크</Text>
          <Text style={{ fontSize: 13, fontWeight: 200, marginBottom: 10 }}>
            링크를 올리면 자동으로 이미지가 연동돼요!
          </Text>
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
          <Text
            style={{
              color: '#777777',
              fontSize: 13,
              fontWeight: 300,
              marginBottom: 7,
            }}
          >
            기존 가격, 제품의 단위(개당 ml등), 수령 예상 일자와 시간을
            구체적으로 작성하면 더 효과적으로 공구 참여자를 모을 수 있어요.
          </Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder="여기에 설명을 입력하세요"
            onChangeText={setText}
            value={text}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>카카오톡 오픈채팅 링크</Text>
          <TextInput
            style={styles.input}
            placeholder="http://카카오톡.openchat"
            value={chatUrl}
            onChangeText={setChatUrl}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
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
  )
}

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
    marginTop: 20,
    paddingTop: 100,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
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
  textInput: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
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
})

export default EditGroupPurchase
