import {StyleSheet, ActivityIndicator } from 'react-native'

export default function LoadingScreen(){
  return (
    <ActivityIndicator style={styles.loading} size="large" color="#fff" />
  )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
      },
})