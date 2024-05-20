import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Main = () => {
  return (
    // <Container>
    //   <StyledText>Main</StyledText>
    // </Container>
    <Text style={styles.text}>main</Text>
  )
}
const styles = StyleSheet.create({
  text: {
    flex: 1,
    backgroundColor: 'white',
    textAlign: 'center',
  },
})
export default Main
